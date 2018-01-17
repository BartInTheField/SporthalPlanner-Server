const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const StaffMember = require('../model/staffmember.model');

const should = chai.should();
const assert = require('assert');
chai.use(chaiHttp);

describe('Staffmembers requests', () => {

    let staffmember;
    let staffmemberId;

    beforeEach((done) => {
        staffMember = new StaffMember({
            firstName: 'Test',
            lastName: 'Man',
            dateOfBirth: new Date()
        }); 

        staffMember.save()
            .then((result) => {
                staffmemberId = result._id;
                done();
             })
    })

    afterEach((done) => {
        StaffMember.findByIdAndRemove(staffmemberId)
                .then(() => {
                    done();
                })
    });


    it('Can post a StaffMember to the NoSQL server', (done) => {
        
        postBody = new StaffMember({
            dateOfBirth: '1998-10-11T00:00:00.000',
            firstName: 'Test',
            lastName: 'Man'
        });

        chai.request(server)
            .post('/api/staffmembers')
            .send(postBody)
            .end((err, res) => {
                //test response
                res.should.have.status(200);
                res.body.should.be.a('object');

                //properties the body should have:
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('dateOfBirth');

                StaffMember.findByIdAndRemove(res.body._id)
                    .then((res) => {
                        done();
                    })
        });
    });

    it('Can post a StaffMember without filling in dateOfBirth and it has today as the date', (done) => {
        
        postBody = new StaffMember({
            firstName: 'Test',
            lastName: 'Man'
        });

        chai.request(server)
            .post('/api/staffmembers')
            .send(postBody)
            .end((err, res) => {
                //test response
                res.should.have.status(200);
                res.body.should.be.a('object');

                //properties the body should have:
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('dateOfBirth');

                const dateOfBirth = new Date(res.body.dateOfBirth);
                const currentDate = new Date();

                assert(dateOfBirth.getFullYear() === currentDate.getFullYear());
                assert(dateOfBirth.getMonth() === currentDate.getMonth());
                assert(dateOfBirth.getDay() === currentDate.getDay());

                StaffMember.findByIdAndRemove(res.body._id)
                    .then((res) => {
                        done();
                    })
        });
    });

    it('Can retrieve a list of all StaffMembers', (done) => {
        chai.request(server)
            .get('/api/staffmembers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');

                res.body[0].should.have.property('firstName');
                res.body[0].should.have.property('lastName');
                res.body[0].should.have.property('dateOfBirth');

                done();
            })
    });

    it('Can retrieve a StaffMember by its ID', (done) => {
        chai.request(server)
            .get('/api/staffmembers/'+staffmemberId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('dateOfBirth');

                done();
            })
    });

    it('Can delete a StaffMember by its ID', (done) => {

        const toDelete = new StaffMember({
            firstName: 'Test',
            lastName: 'Man'
        }); 

        let toDeleteId;

        toDelete.save()
            .then((res) => {
                toDeleteId = res._id;
                chai.request(server)
                    .del('/api/staffmembers/'+ toDeleteId)
                    .end((err, res) => {
                        console.log(err);
                        res.should.have.status(200);

                        StaffMember.findById(toDeleteId)
                            .then((res) => {
                                assert(res === null);
                                done();
                            })
                    });
            });
    });

});