const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3000');

describe('server tests', () => {
  it('should add two number', done => {
    const res = {
      body: {
        data: {
          'value1': 1,
          'value2': 1,
          'operand': '+',
          'totalviews': 1
        }
      }
    }
    server
      .post('/math')
      .send(res.body.data)
      .expect(200)
      .expect('Content-type', /json/)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(2);
        done();
      });
  });

  xit('should subtract two numbers', done => {
    server
      .post('/math')
      .send({ value1: 1, value2: 2, operand: '-' })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(-1);
        done();
      });
  });

  xit('should multiply two numbers', done => {
    server
      .post('/math')
      .send({ value1: 3, value2: 3, operand: '*' })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(9);
        done();
      });
  });

  xit('should divide two numbers', done => {
    server
      .post('/math')
      .send({ value1: 3, value2: 3, operand: '*' })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.error.should.equal(false);
        res.body.data.should.equal(1);
        done();
      });
  });

  it('should return a 404', done => {
    server
      .get('/random')
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        done();
      });
  });
});
