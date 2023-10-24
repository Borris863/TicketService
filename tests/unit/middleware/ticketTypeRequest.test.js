/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import TicketTypeRequest from '../../../src/middleware/TicketTypeRequest.js';

describe('TicketTypeRequest', () => {
  it('should create a valid TicketTypeRequest object', () => {
    const validType = 'Adult';
    const validNoOfTickets = 2;
    const ticketRequest = new TicketTypeRequest(validType, validNoOfTickets);

    expect(ticketRequest.getTicketType()).to.equal(validType);
    expect(ticketRequest.getNoOfTickets()).to.equal(validNoOfTickets);
  });

  it('should throw an error for an invalid type', () => {
    const invalidType = 'InvalidType';
    const validNoOfTickets = 2;

    expect(() => new TicketTypeRequest(invalidType, validNoOfTickets)).to.throw(
      TypeError,
      'type must be Adult, Child, or Infant'
    );
  });

  it('should throw an error for a non-integer number of tickets', () => {
    const validType = 'Child';
    const nonIntegerNoOfTickets = 2.5;

    expect(
      () => new TicketTypeRequest(validType, nonIntegerNoOfTickets)
    ).to.throw(TypeError, 'noOfTickets must be an integer');
  });
});
