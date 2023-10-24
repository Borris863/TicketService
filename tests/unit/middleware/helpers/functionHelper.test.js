/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */

import { describe, it } from 'mocha';
import { expect } from 'chai';
import functionHelper from '../../../../src/middleware/helpers/functionHelper.js';

describe('Function helper', () => {
  it('should check accounts and return the correct account match', async () => {
    const accounts = [{ username: 'user123', accountId: 'account123' }];
    const username = 'user123';
    const result = await functionHelper.checkAccounts(accounts, username);
    expect(result.accountMatch).to.be.true;
    expect(result.accountId).to.equal('account123');
  });

  it('should check ticket requests and return valid results', async () => {
    const ticketRequests = [
      { ticketType: 'Adult', ticketAmount: 2 },
      { ticketType: 'Child', ticketAmount: 3 },
    ];

    const result = await functionHelper.checkTicketRequests(ticketRequests);
    expect(result.isAdultTicket).to.be.true;
    expect(result.isValidNumOfTickets).to.be.true;
    expect(result.totalNumOfTickets).to.equal(5);
  });

  it('should calculate ticket cost correctly', async () => {
    const tickets = [
      { ticketType: 'Adult', ticketAmount: 2 },
      { ticketType: 'Child', ticketAmount: 3 },
    ];

    const result = await functionHelper.calculateTicketCost(tickets);
    expect(result.overallCost).to.equal(70);
  });

  it('should create ticket request correctly', async () => {
    const requestedTickets = [
      { ticketType: 'Adult', ticketAmount: 2, film: 'Movie1', ticketCost: 40 },
      { ticketType: 'Child', ticketAmount: 3, film: 'Movie2', ticketCost: 30 },
    ];

    const result = await functionHelper.createTicketRequest(requestedTickets);

    expect(result).to.deep.equal([
      { ticketType: 'Adult', numOfTickets: 2, film: 'Movie1', totalCost: 40 },
      { ticketType: 'Child', numOfTickets: 3, film: 'Movie2', totalCost: 30 },
    ]);
  });

  it('should calculate correct number of seats', async () => {
    const tickets = [
      { ticketType: 'Adult', numOfTickets: 2 },
      { ticketType: 'Child', numOfTickets: 3 },
      { ticketType: 'Infant', numOfTickets: 1 },
    ];

    const result = functionHelper.calculateCorrectNumOfSeats(tickets);
    expect(result).to.equal(5);
  });
});
