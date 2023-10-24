/* eslint-disable import/extensions */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import functionHelper from '../../middleware/helpers/functionHelper.js';

export default () => async (req, res) => {
  // workout correct number of seats to reserve
  const nomOfSeats = functionHelper.calculateCorrectNumOfSeats(
    req.session.tickets
  );

  // gather info to display on confirmation screen
  res.render('confirmation', {
    title: 'Tickets - confirmation',
    nomOfSeats,
    tickets: req.session.tickets,
    overallCost: req.session.overallCost,
    orderDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
    orderNumber: uuidv4(),
    email: req.session.details.email,
  });
};
