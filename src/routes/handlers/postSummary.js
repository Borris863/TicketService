/* eslint-disable import/extensions */
import TicketService from '../../middleware/TicketService.js';
import functionHelper from '../../middleware/helpers/functionHelper.js';

export default () => async (req, res) => {
  try {
    const requestedTickets = req.session.tickets;
    const { accountId } = req.session;

    // create the immutable ticket request and then purchase the tickets with the request
    const processedTickets =
      await functionHelper.createTicketRequest(requestedTickets);
    const ticketService = new TicketService();
    ticketService.purchaseTickets(Number(accountId), processedTickets);

    // load confirmation page if all went well
    req.session.tickets = processedTickets;
    res.redirect('/confirmation');
  } catch (error) {
    res.render('error', { title: 'Ticket - error' });
  }
};
