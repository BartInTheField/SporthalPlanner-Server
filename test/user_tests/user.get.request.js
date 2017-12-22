const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../model/user.model');

var should = chai.should();
chai.use(chaiHttp);


describe('User routes tests', () => {
    //Delete all users first
    beforeEach((done) => {
        
    });
});