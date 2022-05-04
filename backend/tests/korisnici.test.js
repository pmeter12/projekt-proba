const mongoose=require('mongoose');
const supertest = require('supertest');
const app=supertest('../index.js');
const api=supertest(app);
const pomocni = require('./pomocni');
jest.setTimeout(30000);

describe('Kada imamo samo jednog korisnika u bazi',() =>{
    
    
    test('vraćanje greške ako već postoji username',async () => {
        
        const pocetniKorisnik = await pomocni.korisniciUBazi()

        const novi = {
            korisnciko_ime:'petar',
            email:'mate@pmfst.hr',
            lozinka:'mate$45'
        }

        await api
        .post('/api/korisnici')
        .send(novi)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const korisniciKraj = await pomocni.korisniciUBazi()
        expect(korisniciKraj).toHaveLength(pocetniKorisnik.length+1)
        const korImena = korisniciKraj.map(u => u.korisnciko_ime)
        expect(korImena).toContain(novi.korisnciko_ime);
    })
})

afterAll(()=> {
    mongoose.connection.close()
})