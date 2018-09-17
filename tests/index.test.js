
const express = require('express');
const request = require('supertest');
const server = require('../index');

let req = {
  body: {}
}

let res = {
  sendCalledWith: '',
  counter: (arg) => {
    this.sendCalledWith = arg;
  }
};
describe('root route', () => {
  xtest('Allow a user to land at / and count up the number of requests they have made to the website' , async () => {
    const response = await request(express).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(server.body.data).toEqual('Sending some json');
  });
});

describe('/math route should add, subtract and multiply 2 numbers', () => {
  test('/math/add/1/1', () => {
    expect(server.body.data).toEqual(2);
  });
  test('/math/2-3', () => {
    expect(server.body.data).toEqual(-1);
  });
  test('/math/3*3', () => {
    expect(server.body.data).toEqual(9);
  });
});
