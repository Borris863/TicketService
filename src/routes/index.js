const express = require('express');

const router = express.Router();

const getTickets = require('./handlers/getTickets');
const postTickets = require('./handlers/postTickets');
// const confirmation = require('./handlers/confirmation');

router.get('/tickets', getTickets());
router.post('/tickets', postTickets());

// router.get('/confirmation', confirmation());

module.exports = router;
