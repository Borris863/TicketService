/* eslint-disable import/extensions */
import express from 'express';

import getTickets from './handlers/getTickets.js';
import postTickets from './handlers/postTickets.js';
import getSummary from './handlers/getSummary.js';
import postSummary from './handlers/postSummary.js';
import getConfirmation from './handlers/getConfirmation.js';

const router = express.Router();

// define routes in application
router.get('/tickets', getTickets());
router.post('/tickets', postTickets());
router.get('/summary', getSummary());
router.post('/summary', postSummary());
router.get('/confirmation', getConfirmation());

export default router;
