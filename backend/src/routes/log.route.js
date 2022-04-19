const { Router } = require("express");
const LogUlaz= require("../models/LogUlaz.model.js");

const { API_kljuc } = process.env;

const router = Router();

router.get("/",async (req, res, next) =>{
    try{
        const ulazi = await LogUlaz.find();
        res.json(ulazi);
    }
    catch(error){
        next(error);
    }
});

router.post("/",async (req, res, next) => {
    try{
        if(req.get("X-API-KEY") !== API_kljuc) {
            res.status(401);
            throw new Error("Neovlašteni pristup");
        }
        const logUlaz = new LogUlaz(req.body);
        const kreiranUlaz = await logUlaz.save();
        res.json(kreiranUlaz);
    } catch(error){
        if(error.ime === "ValidationError"){
            res.status(422);
        }
        next(error);
    }
});

module.exports=router;