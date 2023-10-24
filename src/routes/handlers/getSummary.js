/* eslint-disable import/extensions */
import functionHelper from '../../middleware/helpers/functionHelper.js';

export default () => async (req, res) => {
  let { tickets } = req.session;
  const { username } = req.session.details;

  // works out the cost of the tickets and the passes relevant information into screen
  const calculatedTickets = await functionHelper.calculateTicketCost(tickets);
  const { overallCost } = calculatedTickets;

  tickets = calculatedTickets.tickets;
  req.session.tickets = tickets;
  req.session.overallCost = overallCost;

  res.render('summary', {
    title: 'Tickets - summary',
    tickets,
    username,
    overallCost,
  });
};
