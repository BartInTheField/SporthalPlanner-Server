const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Customer = require('../model/customer.model');

describe('Testing customers routes:', () => {
  let customer;
  let customerId;
  let putCustomer;
  let putId;

  customer = new Customer({
    'userId':'a',
    'sporthalHurenUsername':'Henkie420',
    'sporthalHurenUserId':'',
    'firstName':'Henk',
    'lastName':'Henkerson',
    'isSporthalHurenCustomer':false
  })

  putCustomer = new Customer({
    'userId':'ABC123',
    'sporthalHurenUsername':'Henkie420',
    'sporthalHurenUserId':'',
    'firstName':'Jan',
    'lastName':'Janus',
    'isSporthalHurenCustomer':false,
    '_id':putId
  })

  afterEach((done) => {
    Customer.findByIdAndRemove(customerId)
      .then(() => done());
  });

  it('can Post a new customer', (done) => {
    chai.request(server)
      .post('/api/customers/')
      .send(customer)
      .end((err,res) => {
        customerId = res.body._id;

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('firstName','Henk'); //.that.has.property('Henk');
        res.body.should.have.property('lastName','Henkerson'); //.that.has.property('Henkerson');
        done();
      })
  })

  it('can Get a single customer', (done) => {
    chai.request(server)
      .post('/api/customers/')
      .send(customer)
      .end((err,res)=>{
        chai.request(server)
          .get('/api/customers/'+res.userId)
          .end((err,response)=>{
            response.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName','Henk'); //.that.has.property('Henk');
            res.body.should.have.property('lastName','Henkerson'); //.that.has.property('Henkerson');
            done();
          })
      })
  })

  it('can update a single customer', (done) => {
    chai.request(server)
      .post('/api/customers/')
      .send(customer)
      .end((err,res)=>{

        putId = res.body._id;
        customerId = res.body._id;

        console.log('LOGID'+putId);
        chai.request(server)
          .put('/api/customers/'+putId)
          .send(putCustomer)
          .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('firstName','Jan'); //.that.has.property('Henk');
            response.body.should.have.property('lastName','Janus'); //.that.has.property('Henkerson');
            done();
          })
      })
  })

  it('can delete a single customer', (done) => {
    chai.request(server)
      .post('/api/customers/')
      .send(customer)
      .end((err,res)=>{
        putId = res.body._id;
        chai.request(server)
          .delete('/api/customers/'+putId)
          .end((err,response) => {
            response.should.have.status(200);
            Customer.findById(response.body._id)
              .then((customer) => {
                assert(customer === null);
              });
            done();
          })
      })
  })
})
