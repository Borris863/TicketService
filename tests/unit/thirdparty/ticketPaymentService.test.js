/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import TicketPaymentService from '../../../src/thirdparty/paymentgateway/TicketPaymentService.js';

describe('TicketPaymentService', () => {
  it('should throw an error for invalid accountId', () => {
    const ticketPaymentService = new TicketPaymentService();
    const invalidAccountId = 'invalidAccountId';
    const totalAmountToPay = 100;

    const makePaymentWithError = () => {
      ticketPaymentService.makePayment(invalidAccountId, totalAmountToPay);
    };

    expect(makePaymentWithError).to.throw(
      TypeError,
      'accountId must be an integer'
    );
  });

  it('should throw an error for invalid totalAmountToPay', () => {
    const ticketPaymentService = new TicketPaymentService();

    const accountId = 1;
    const invalidTotalAmountToPay = 'invalidTotalAmountToPay';
    const makePaymentWithError = () => {
      ticketPaymentService.makePayment(accountId, invalidTotalAmountToPay);
    };

    expect(makePaymentWithError).to.throw(
      TypeError,
      'totalAmountToPay must be an integer'
    );
  });

  it('should not throw errors for valid input', () => {
    const ticketPaymentService = new TicketPaymentService();
    const accountId = 1;
    const totalAmountToPay = 100;

    expect(() => {
      ticketPaymentService.makePayment(accountId, totalAmountToPay);
    }).to.not.throw();
  });
});
