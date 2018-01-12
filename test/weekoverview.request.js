const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const Customer = require('../model/customer.model');
const SportsFacility = require('../model/sportsfacility.model');

describe('Weekoverview test: ', function () {
  let customer;
  let customerId;
  let sportsfacility;
  let sportsfacilityId;
  let date = '20021010'

  customer = new Customer({
    'userId':'a',
    'sporthalHurenUsername':'Henkie420',
    'sporthalHurenUserId':'',
    'firstName':'Henk',
    'lastName':'Henkerson',
    'isSporthalHurenCustomer':false
  })

  sportsfacility = new SportsFacility({
    "openingHours": {
      "openingHoursId": 4,
      "monday": "7,00;21,00",
      "tuesday": "7,00;21,00",
      "wednesday": "7,00;21,00",
      "thursday": "0,00;0,00",
      "friday": "7,00;21,00",
      "saturday": "7,00;15,00",
      "sunday": "0,00;0,00"
    },
    "email": "Mooiesporthaltehuur@email.nl",
    "phone": "612345678",
    "city": "Engeland",
    "address": "Straat 3",
    "name": "Sportzone",
    "sportsHalls": []
  })

  afterEach((done) => {
    Customer.findByIdAndRemove(customerId)
      .then(() =>
        SportsFacility.findByIdAndRemove(sportsfacilityId)
          .then(()=>{
            done();
          }))
  });

  it('Can get a week overview', (done) => {
    chai.request(server)
      .post('/api/customers/')
      .send(customer)
      .end((err,res)=>{
        customerId = res.userId;
        chai.request(server)
          .post('/api/sportsfacility/')
          .send(sportsfacility)
          .end((err,res) => {
            sportsfacilityId = res.body._id;
            chai.request(server)
              .get('/api/weekoverview/'+customerId+'/'+sportsfacilityId+'/'+date)
              .end((err,res) => {
                res.should.have.status(200);
                done();
              })
          })

      })
  })

})