var { admins} = require('../config/migrations');
var adminModel = require('../models/admin.model');

module.exports =  { 
    migrateAdmin: async () => {

        await admins.forEach(async admin => {
            let adminDocumentCount = await adminModel.countDocuments({
               email : admin.email
            })         
                if(adminDocumentCount === 0) {
                    
                        await adminModel.create({
                            ...admin
                        })
                }
        })
    }
}