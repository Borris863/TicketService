async function checkAccounts(accounts, username) {
  // loop through all accounts and check for username match if found return true with the account id
  let accountMatch = false;
  let accountId;
  accounts.forEach((account) => {
    if (account.username === username) {
      accountMatch = true;
      accountId = account.accountId;
    }
  });

  return { accountMatch, accountId };
}

async function checkTicketRequests(ticketRequests) {
  // check to see if an Adult ticket is present in the ticket request
  let isAdultTicket = false;
  if (ticketRequests.filter((e) => e.ticketType === 'Adult').length > 0) {
    isAdultTicket = true;
  }

  // work out the total number of tickets and ensure it is not over 20
  let isValidNumOfTickets = false;
  const totalNumOfTickets = ticketRequests.reduce(
    (a, b) => +a + +b.ticketAmount,
    0
  );

  if (totalNumOfTickets <= 20) {
    isValidNumOfTickets = true;
  }

  return { isAdultTicket, isValidNumOfTickets, totalNumOfTickets };
}

export default {
  checkAccounts,
  checkTicketRequests,
};
