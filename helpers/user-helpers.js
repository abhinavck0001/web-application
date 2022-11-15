
const db = require('../config/connection')
var collection = require('../config/collections');
var objectId = require('mongodb').ObjectID


const bcrypt = require('bcrypt');
const collections = require('../config/collections');
const { ObjectId } = require('mongodb');
module.exports = {

    doSignup: (userdata) => {

        return new Promise(async (resolve, reject) => {

            userdata.Password = await bcrypt.hash(userdata.Password, 10)

            db.get().collection(collection.USER_COLLECTION).insertOne(userdata).then((data) => {

                resolve(data.insertedId)
            })

        })



    },

    dologin: (userData) => {

        return new Promise(async (resolve, reject) => {
            loginStatus = false
            let response = {}
            // checking whther the user exsist using email
            //taking usrs data from databse
            //here email is login page.hbs email's name attribute vlue
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({ Email: userData.Email })

            if (user) {
                //userData.password is curently logining details 
                //user.password is password which is in database

                bcrypt.compare(userData.Password, user.Password).then((status) => {
                    if (status) {
                        console.log("login sucess");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("failed");
                        resolve({ status: false })
                    }
                })


            } else {
                console.log("login failed");
                resolve({ status: false })
            }


        })
    },

    getusers: () => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collections.USER_COLLECTION).find().toArray()

            resolve(user)

        })
    },

    deleteuser: (userid) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: userid }).then(() => {
                resolve();
            });
        })
    }


}