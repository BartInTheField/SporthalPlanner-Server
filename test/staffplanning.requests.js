const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Staffplanning = require('../model/staffplanning.model');
const StaffMember = require('../model/staffmember.model');
const SportsFacility = require('../model/sportsfacility.model');

const should = chai.should();
const assert = require('assert');
chai.use(chaiHttp);

describe('Staffplanning requests', () => {
    let staffMember;
    let staffMemberId = '0';

    let sportsFacility;
    let sportsFacilityId = '0';

    let staffplanning;
    let staffplanningId;

    beforeEach((done) => {
        staffMember = new StaffMember({
            firstName: 'Test',
            lastName: 'Man',
            dateOfBirth: new Date()
        }); 

        sportsFacility = new SportsFacility({
            name: 'DuurzaamSport',
            address: 'Nog wat straat 11',
            city: 'Ridderkerk',
            phone: '0612349283',
            email: 'test@mail.com',
            openingHours: undefined
        });

        staffplanning = new Staffplanning({
            day: '2018-01-27T00:00:00.000',
            startingTime: '11:00',
            endingTime: '12:00',
            sportsFacility: sportsFacilityId,
            staffMember: staffMemberId
        });

        staffMember.save()
            .then((result) => {
                staffMemberId = result._id;
                sportsFacility.save()
                    .then((result) => {
                        sportsFacilityId = result._id;
                        staffplanning.sportsFacility = sportsFacilityId;
                        staffplanning.staffMember = staffMemberId;
                        staffplanning.save()
                            .then((result) => {
                                staffplanningId = result._id;
                                done();
                            })
                    })
            })
    })

    afterEach((done) => {
        Staffplanning.findByIdAndRemove(staffplanningId)
            .then(() => StaffMember.findByIdAndRemove(staffMemberId)
                .then(() => {
                    SportsFacility.findByIdAndRemove(sportsFacilityId)
                        .then(() => done())
                }))
    });

    it('Can get all StaffPlannings by SportsFacility', (done) => {
        chai.request(server)
            .get('/api/staffplannings/sportsfacilities/' + sportsFacilityId)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');

                res.body[0].should.have.property('day');
                res.body[0].should.have.property('startingTime');
                res.body[0].should.have.property('endingTime');
                res.body[0].should.have.property('sportsFacility');
                res.body[0].should.have.property('staffMember');

                done();
            })
    });

    it('Can delete a StaffPlannings by its ID', (done) => {

        toDelete = new Staffplanning({
            day: '2018-01-28T00:00:00.000',
            startingTime: '12:00',
            endingTime: '16:00',
            sportsFacility: sportsFacilityId,
            staffMember: staffMemberId
        });

        let deleteId;

        toDelete.save()
            .then((res) => {
                deleteId = res._id;
                chai.request(server)
                .del('/api/staffplannings/' + deleteId)
                .end((err,res) => {
                    res.should.have.status(200);

                    Staffplanning.findById(deleteId)
                        .then((res) => {
                            assert(res === null);
                            done();
                        });
                });
            });
    });
});