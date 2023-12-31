/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
import accountsHelper from '../../middleware/helpers/accounts.js';
import functionHelper from '../../middleware/helpers/functionHelper.js';

export default () => async (req, res) => {
  // get accounts to check against
  const accounts = await accountsHelper();
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
      ticketAmount: Number(ticketAmount[i]),
      film: film[i],
    }));
  } else {
    const ticketRequest = { ticketType, ticketAmount, film };
    ticketRequests.push(ticketRequest);
  }

  // check if there are mutliple tickets of same type and combine them
  ticketRequests = ticketRequests.reduce((r, { ticketType, ticketAmount }) => {
    const temp = r.find((o) => o.ticketType === ticketType);
    if (temp) {
      temp.ticketAmount += ticketAmount;
    } else {
      r.push({ ticketType, ticketAmount, film: 'Frozen' });
    }
    return r;
  }, []);

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

  // if all validation checks are successful then direct to summary screen
  if (
    accountChecks.accountMatch !== false &&
    checkTicketRequestDetails.isAdultTicket !== false &&
    checkTicketRequestDetails.isValidNumOfTickets !== false
  ) {
    req.session.tickets = ticketRequests;
    req.session.accountId = accountChecks.accountId;
    req.session.details = req.body;

    res.redirect('/summary');
  }
};
