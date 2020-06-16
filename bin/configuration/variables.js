const variables = {
    Api:{
        port:process.env.port  || 3000
    },
    Database:{
        connection: process.env.connection || ''
    },
    Security:{
        secretKey: ''
    }
}

module.exports = variables;