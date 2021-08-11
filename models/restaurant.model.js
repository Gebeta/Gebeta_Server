const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt')

const restaurantSchema = new mongoose.Schema({
    userName: { type: String, default: '', unique: true },
    email: { type: String, unique: true, trim: true, lowercase: true, required: true},
    password: { type: String, required: true, minlength: 8, maxlength: 128},
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
 

restaurantSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('restaurant', restaurantSchema);
