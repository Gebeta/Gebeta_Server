var { admins, clients, drivers, orders } = require('../config/migrations');
var adminModel = require('../models/admin.model');
var clientModel = require('../models/client.model');
var driverModel = require('../models/driver.model');
var orderModel = require('../models/order.model');

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
    },

    migrateClient: async () => {
        await clients.forEach(async client => {
            let count = await clientModel.countDocuments({
                email : client.email
            })  
            if(count === 0) {
                await clientModel.create({
                    ...client
                })
            }
        })
    },

    migrateDriver: async () => {
        await drivers.forEach(async driver => {
            let count = await driverModel.countDocuments({
                email : driver.email
            })  
            if(count === 0) {
                await driverModel.create({
                    ...driver
                })
            }
        })
    },

    // migrateOrder: async () => {
    //     await orders.forEach(async order => {
    //         let count = await orderModel.countDocuments({
    //             client_id : order.client_id
    //         })  
    //         if(count === 0) {
    //             await orderModel.create({
    //                 ...order
    //             })
    //         }
    //     })
    // }
}