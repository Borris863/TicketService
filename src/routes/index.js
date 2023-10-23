import express from 'express';

import getTickets from './handlers/getTickets.js';
import postTickets from './handlers/postTickets.js';

const router = express.Router();
// const confirmation = require('./handlers/confirmation');

router.get('/tickets', getTickets());
router.post('/tickets', postTickets());

// router.get('/confirmation', confirmation());

export default router;
