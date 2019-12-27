var express = require('express');
var router = express.Router();

router.get('/', (request, reponse, next) => {
    reponse.send(`yoink`)
})

router.post('/', (request, reponse, next) => {
    const {method, body, headers, type} = request

    const sendBack = {
        user: body.user,
        enby: body.enby
    }

    reponse.send (sendBack)
    // console.log(body.user);
})

module.exports = router;