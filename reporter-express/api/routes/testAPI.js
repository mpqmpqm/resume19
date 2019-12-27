var express = require('express');
var router = express.Router();

let data = []

router.get('/', (request, reponse, next) => {
    reponse.send(`yoink`)
})

router.post('/', (request, reponse, next) => {
    const {method, body, headers, type} = request

    const sendBack = {
        input: body.input,
        timestamp: body.timestamp
    }

    reponse.send (sendBack)

})

module.exports = router;