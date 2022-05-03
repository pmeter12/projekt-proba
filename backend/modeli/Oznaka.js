const mongoose = require('mongoose');

const OznakaSchema = new mongoose.Schema(
    {
        korisnicko_ime: {
            type:String,
            require: true,
        },
        naslov: {
            type:String,
            require:true,
            min:3,
        },

        ocjena:{
            type:Number,
            require:true,
            min:0,
            max:5,
        },

        lat: {
            type:Number,
            require:true,
        },
        long: {
            type:Number,
            require:true,
        },
        desc: {
            type:String,
            require:true,
            min:3,
        },


    },
    { timestamps:true }
    
);

module.exports=mongoose.model('Oznaka',OznakaSchema);