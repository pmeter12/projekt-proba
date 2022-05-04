const Korisnik = require('../modeli/Korisnik');

const korisniciUBazi = async () => {
    const korisnici = await Korisnik.find({})
    return korisnici.map(k=>k.toJSON())
}

module.exports={
    korisniciUBazi,
};