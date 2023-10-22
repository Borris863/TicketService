const accountsHelper = require('../../middleware/helpers/accounts');
const functionHelper = require('../../middleware/helpers/functionHelper');

module.exports = () => async (req, res) => {
  console.log(req.body);

  // get accounts to check against
  const accounts = await accountsHelper.getAccounts();
  const { username } = req.body;

  // check username input against all accounts and if not match throw error in page
  const accountChecks = await functionHelper.checkAccounts(accounts, username);
  if (accountChecks.accountMatch === false) {
    res.render('tickets', {
      title: 'Tickets',
      error: 'username',
    });
  }

  const { ticketType } = req.body;
  const { film } = req.body;
  const ticketAmount = req.body.amount;

  let ticketRequests = [];

  // check if multiple tickets have been requested if so combine all into one array
  if (Array.isArray(ticketType)) {
    ticketRequests = ticketType.map((v, i) => ({
      ticketType: ticketType[i],
      ticketAmount: ticketAmount[i],
      film: film[i],
    }));
  } else {
    const ticketRequest = { ticketType, ticketAmount, film };
    ticketRequests.push(ticketRequest);
  }

  // freeze the ticket request so that it is immutable
  ticketRequests = Object.freeze(ticketRequests);

  const checkTicketRequestDetails =
    await functionHelper.checkTicketRequests(ticketRequests);

  // check if no adult ticket has been requested and if not return error in ui
  if (checkTicketRequestDetails.isAdultTicket === false) {
    res.render('tickets', {
      title: 'Tickets',
      error: 'ticketType',
    });
  }

  // check if valid num of tickets requested if not throw error on ui
  if (checkTicketRequestDetails.isValidNumOfTickets === false) {
    res.render('tickets', {
      title: 'Tickets',
      error: 'numOfTickets',
    });
  }

  // render the confirm page with ticketRequests, user details and price

  // https://bbbootstrap.com/snippets/bootstrap-order-confirmation-invoice-bill-template-49857128 use for final page
};
