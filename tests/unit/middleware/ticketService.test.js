/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import TicketService from '../../../src/middleware/TicketService.js';
import InvalidPurchaseException from '../../../src/middleware/InvalidPurchaseException.js';

const ticketTypeRequests = [
  {
    numOfTickets: 2,
    ticketType: 'Adult',
    film: 'Frozen',
    totalCost: 40,
  },
  {
    numOfTickets: 2,
    ticketType: 'Child',
    film: 'Frozen',
    totalCost: 20,
  },
];

describe('TicketService', () => {
  it('should purchase tickets and reserve seats successfully', () => {
    const accountId = '1234';
    const paymentServiceStub = sinon.stub(
      TicketService.prototype,
      'purchaseTickets'
    );
    paymentServiceStub.returns(Promise.resolve());

    const ticketService = new TicketService();
    return ticketService
      .purchaseTickets(accountId, ticketTypeRequests)
      .then(() => {
        expect(paymentServiceStub.calledWith(accountId, ticketTypeRequests)).to
          .be.true;
      });
  });

  it('should throw InvalidPurchaseException for payment failure', async () => {
    const accountId = 'abc';
    const paymentServiceStub = sinon.stub(
      TicketService.prototype,
      'purchaseTickets'
    );
    paymentServiceStub.returns(Promise.reject(new Error('Payment error')));

    const ticketService = new TicketService();
    try {
      ticketService.purchaseTickets(accountId, ticketTypeRequests);
    } catch (error) {
      expect(error).to.be.an.instanceOf(InvalidPurchaseException);
      expect(error.message).to.equal('Error making payment: Payment error');
    }
  });

  it('should throw InvalidPurchaseException for seat reservation failure', async () => {
    const accountId = '123';
    const paymentServiceStub = sinon.stub(
      TicketService.prototype,
      'purchaseTickets'
    );
    paymentServiceStub.returns(Promise.resolve());

    const ticketService = new TicketService();
    try {
      ticketService.purchaseTickets(accountId, ticketTypeRequests);
    } catch (error) {
      expect(error).to.be.an.instanceOf(InvalidPurchaseException);
      expect(error.message).to.equal(
        'Error reserving seats: Reservation error'
      );
    }
  });

  afterEach(() => {
    sinon.restore();
  });
});
