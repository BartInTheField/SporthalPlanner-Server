const server = require('../server');
const Openinghours = require('../model/openinghours.model')

const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Openingshours tests', function () {
  it('Openinghours get', function () {
    chai.request(server)
      .get('/openinghours/')
      .end(function (err,res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.not.be.html;
      })
  })
})