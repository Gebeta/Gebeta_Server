const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    tin: {type: String, required: true, minlength:9},
    email: { type: String, unique: true, trim: true, lowercase: true, required: true},
    password: { type: String, required: true, minlength: 8, maxlength: 15},
    phone_no: { type: String, required: true, minlength: 10, maxlength: 15},
    address: {type: String, default: ''},
    is_approved: {type: Boolean, default: false},
    status: {type: Boolean, default: false},
    restPic: {type: String, required: true },
    business_license: {type: String, required: true },
    idCard: {type: String, required: true },
    rating: { type: Number, default: 0 }
  },
  {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
})

restaurantSchema.pre('save', function preSave(next) {
    let model = this

    model.hashPasswd(model.password, (err, hash) => {
        model.password = hash
        next()
    })
})

restaurantSchema.method({
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
 


module.exports = mongoose.model('restaurant', restaurantSchema);
