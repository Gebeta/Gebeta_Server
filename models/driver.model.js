const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const driverSchema = new mongoose.Schema({
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    car: {type: String, default: ''},
    car_plate: {type: String, default: ''},
    email: { type: String, unique: true, trim: true, lowercase: true, required: true},
    password: { type: String, required: true, minlength: 8, maxlength: 128},
    phone_no: { type: String, required: true, minlength: 10, maxlength: 12}
  },
  {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
})

driverSchema.pre('save', function preSave(next) {
    let model = this

    model.hashPasswd(model.password, (err, hash) => {
        model.password = hash
        next()
    })
})

driverSchema.method({
    verifyPassword(passwd) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(passwd, this.password, (err, isMatch) => {
            if (err) {
              return reject(err)
            }
      
            resolve(isMatch)
          })
        })
      },
      hashPasswd(passwd, cb) {
        let createHash = (err, hash) => {
          if (err) {
            return cb(err)
          }
      
          cb(null, hash)
        }
      
        let generateSalt = (err, salt) => {
          if (err) {
            return cb(err)
          }
      
          // Hash the password using the generated salt
          bcrypt.hash(passwd, salt, createHash)
        }
      
        // Generate a salt factor
        bcrypt.genSalt(12, generateSalt) 
      }
})
 

module.exports = mongoose.model('driver', driverSchema);