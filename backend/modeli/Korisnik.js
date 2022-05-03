const mongoose = require('mongoose');

const KorisnikSchema = new mongoose.Schema(
    {
        korisnicko_ime : {
            type: String,
            require: true,
            min:6,
            max: 15,
            unique: true,
        },

        lozinka: {
            type:String,
            require:true,
            min:8,
        },

        email: {
            type: String,
            require: true,
            min:6
        },
    },
    {timestamps: true  }
);

module.exports = mongoose.model('Korisnik',KorisnikSchema);