/* eslint-disable no-return-assign */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import TicketTypeRequest from '../TicketTypeRequest.js';

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

async function calculateTicketCost(tickets) {
  let overallCost = 0;
  // works out for each ticket request how much each one is and the overall cost
  tickets.forEach((ticket) => {
    const { ticketType } = ticket;
    const nomOfTickets = ticket.ticketAmount;

    let ticketCost = 0;

    if (ticketType === 'Adult') {
      ticketCost = 20;
    } else if (ticketType === 'Child') {
      ticketCost = 10;
    }

    ticket.ticketCost = nomOfTickets * ticketCost;
    overallCost += ticket.ticketCost;
  });
  return { tickets, overallCost };
}

async function createTicketRequest(requestedTickets) {
  const processedTickets = [];

  // for each ticket request it create a new immutable ticket request and returns it for use in payments
  requestedTickets.forEach((ticket) => {
    const processedTicket = {};
    const ticketRequest = new TicketTypeRequest(
      ticket.ticketType,
      Number(ticket.ticketAmount)
    );
    processedTicket.numOfTickets = ticketRequest.getNoOfTickets();
    processedTicket.ticketType = ticketRequest.getTicketType();
    processedTicket.film = ticket.film;
    processedTicket.totalCost = ticket.ticketCost;

    processedTickets.push(Object.freeze(processedTicket));
  });
  return processedTickets;
}

function calculateCorrectNumOfSeats(tickets) {
  // removes infants from the calculation and works out the number of seat needed to reserve
  const removeInfantTickets = tickets.filter((x) => x.ticketType !== 'Infant');
  const totalNumOfSeats = removeInfantTickets.reduce(
    (a, b) => +a + +b.numOfTickets,
    0
  );

  return totalNumOfSeats;
}

export default {
  checkAccounts,
  checkTicketRequests,
  calculateTicketCost,
  createTicketRequest,
  calculateCorrectNumOfSeats,
};
