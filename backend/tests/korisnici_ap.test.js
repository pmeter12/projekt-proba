const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')


const api=supertest(app);


test('Korisnici se vraćaju kao JSON', async () => {
    await api
      .get('/api/korisnici')
      .expect(200)
      .expect('Content-Type', /application\/json/)    
})



afterAll(() => {
    mongoose.connection.close()
})