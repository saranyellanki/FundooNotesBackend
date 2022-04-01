import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs';

import app from '../../src/index';

const rawdata = fs.readFileSync('tests/integration/user.json');
const userJSON = JSON.parse(rawdata);
let jwToken = "";
let newJwtoken = "";



describe('User APIs Test', () => {

  beforeEach((done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(userJSON.UserData2)
      .end((err, res) => {
        jwToken = res.body.token;
        expect(res.statusCode).to.be.equal(200);
      })
    done();
  })


  // before((done) => {
  //   const clearCollections = () => {
  //     for (const collection in mongoose.connection.collections) {
  //       mongoose.connection.collections[collection].deleteOne(() => { });
  //     }
  //   };

  //   const mongooseConnect = async () => {
  //     await mongoose.connect(process.env.DATABASE_TEST);
  //     clearCollections();
  //   };

  //   if (mongoose.connection.readyState === 0) {
  //     mongooseConnect();
  //   } else {
  //     clearCollections();
  //   }

  //   done();
  // });

  // describe('registration', () => {
  //   const inputBody = userJSON.UserData1;
  //   it('given user details in registration should be saved in database', (done) => {
  //     request(app)
  //       .post('/api/v1/register')
  //       .send(inputBody)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(201);
  //         done();
  //       });
  //   });
  // });

  describe('login', () => {
    const inputBody = userJSON.UserData2;
    it('given user details for login should fetch from database', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  })

  describe('/user/addNote', () => {
    const inputBody = userJSON.UserData3;
    it('given user token should add note to the user profile', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('token', `${jwToken}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        })
    })
  })

  describe('/notes', () => {
    it('given token should retrieve all the notes of the user', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('token',`${jwToken}`)
        .end((err,res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  })

  describe('/notes/archieve', () => {
    it('given token should retrieve only archieved notes of the user', (done) => {
      const inputBody = userJSON.archievedNotes;
      request(app)
        .get('/api/v1/notes/archievedNotes')
        .send(inputBody)
        .set('token',`${jwToken}`)
        .end((err,res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  })

  describe('/notes/trashNotes', () => {
    it('given token should retrieve only trashed notes of the user', (done) => {
      const inputBody = userJSON.trashNotes;
      request(app)
        .get('/api/v1/notes/trashedNotes')
        .send(inputBody)
        .set('token',`${jwToken}`)
        .end((err,res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  })

  describe('/notes/_id', () => {
    it('given token should retrieve only single note of the user', (done) => {
      const inputBody = userJSON.singleNote;
      request(app)
        .get('/api/v1/notes/'+ inputBody._id )
        .send(inputBody)
        .set('token',`${jwToken}`)
        .end((err,res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  })

  describe('/notes/update', () => {
    it('given token should update notes of the user', (done) => {
      const inputBody = userJSON.updateNote;
      request(app)
        .put('/api/v1/notes/' + inputBody._id)
        .send(inputBody)
        .set('token',`${jwToken}`)
        .end((err,res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        })
    })
  })

  // describe('/notes/delete', () => {
  //   it('given token should delete notes of the user', (done) => {
  //     const inputBody = userJSON.deleteNote;
  //     request(app)
  //       .delete('/api/v1/user/' + inputBody._id)
  //       .send(inputBody)
  //       .set('token',`${jwToken}`)
  //       .end((err,res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       })
  //   })
  // })

  // describe('/forget Password', () => {
  //   it('given user when provides email should receive a mail for reset password', (done) => {
  //     const inputBody = userJSON.forgetPassword;
  //     request(app)
  //       .post('/api/v1/forgetPassword')
  //       .send(inputBody)
  //       .end((err,res) => {
  //         newJwtoken = res.body.token;
  //         expect(res.statusCode).to.be.equal(200);
  //         done();
  //       })
  //     })
  // })

  describe('/reset Password', () => {
    it('given user when provide new password should be updated in database', (done) => {
      const inputBody = userJSON.resetPassword;
      request(app)
        .put('/api/v1/resetPassword')
        .set('token',`${newJwtoken}`)
        .send(inputBody)
        .end((err,res) => {
          expect(res.statusCode).to.be.equal(200);
        done();
        })
    })
  })

});
