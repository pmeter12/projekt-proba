const router= require('express').Router();
const Korisnik=require('../modeli/Korisnik');
const bcrypt = require('bcrypt');
const jsonweb = require('jsonwebtoken');

//registracija

router.post('/register',async(req,res) => {
    try{
        //generiramo lozinku pomoću bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashlozinka = await bcrypt.hash(req.body.lozinka, salt);

        const noviKorisnik = new Korisnik({
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka:hashlozinka,
            email:req.body.email,
        });

        //spremamo korisnika i šaljemo odgovor

        const korisnik = await noviKorisnik.save();
        res.status(200).json(korisnik._id);

    } catch(err){
        res.status(500).json(err);
    }
    
});

//logiranje

router.post('/login',async(req,res) => {
    try{
        //pronalaženje korisnika

        const korisnik = await Korisnik.findOne({korisnicko_ime:req.body.korisnicko_ime});
        if(!korisnik){
            res.status(400).json("Pogrešno korisničko ime!");
            return;
        }
        //validacija lozinke

        const tocnaLozinka = await bcrypt.compare(
            req.body.lozinka,
            korisnik.lozinka
        );
        if(!tocnaLozinka){
            res.status(400).json("Pogrešna lozinka!");
            return;
        }


        const validniToken = jsonweb.sign(
            {ime: korisnik.korisnicko_ime, email: korisnik.email},
            process.env.tajni_kljuc,
            {expiresIn:"5d"}
        );
        
        
        res.status(200).json({_id: korisnik._id, korisnicko_ime:korisnik.korisnicko_ime, validniToken});
        
    }  catch(err) {
        res.status(500).json(err);
    } 
});

router.get('/', async(req,res) => {
    try{
        const korisnici = await Korisnik.find();
        res.status(200).json(korisnici);

    } catch{
        res.status(500).json(err);
    }
})

module.exports=router;