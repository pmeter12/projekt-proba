const router = require('express').Router();
const Oznaka = require('../modeli/Oznaka');


//Kreiranje oznake

router.post('/',async (req,res) => {
    const novaOznaka = new Oznaka(req.body);
    try{
        const spremljenaOznaka = await novaOznaka.save();
        res.status(200).json(spremljenaOznaka);
    } catch(err){
        res.status(500).json(err);
    }
});

//dobivanje svih oznaka

router.get('/', async(req,res) => {
    try{
        const oznake = await Oznaka.find();
        res.status(200).json(oznake);

    } catch{
        res.status(500).json(err);
    }
})


module.exports=router;