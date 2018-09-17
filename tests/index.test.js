
const express = require('express');
const request = require('supertest');
const server = require('../index');


describe('root route', () => {
  test('Allow a user to land at / and count up the number of requests they have made to the website' , (done) => {
    return request(express)
      .get('/')
      .expect(200)
      .end((err, res) => {
       if(err) return done(err);
       res.send('ok');
       done();
      })
    // const response = await request(express).get('/');
    // expect(response.status).toEqual(200);
    // expect(response.type).toEqual('application/json');
    // expect(server.body.data).toEqual('Sending some json');
  });
});

// describe('/math route should add, subtract and multiply 2 numbers', () => {
//   test('/math/add/1/1', () => {
//     expect(server.body.data).toEqual(2);
//   });
//   test('/math/2-3', () => {
//     expect(server.body.data).toEqual(-1);
//   });
//   test('/math/3*3', () => {
//     expect(server.body.data).toEqual(9);
//   });
// });
