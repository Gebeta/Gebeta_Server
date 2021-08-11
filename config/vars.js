module.exports = {
    env: "development",
    port: 1000,
    mongo: {
      uri: "mongodb://localhost:27017/gebetaDeliveryDB",
    },
    logs: 'production' ? 'combined' : 'dev',
    jwt_key: 'sampleRandomKey',
    session_key : "randomsession"    
};