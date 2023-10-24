/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import SeatReservationService from '../../../src/thirdparty/seatbooking/SeatReservationService.js';

describe('SeatReservationService', () => {
  it('should throw an error for invalid accountId', () => {
    const seatReservationService = new SeatReservationService();
    const invalidAccountId = 'invalidAccountId';
    const totalSeatsToAllocate = 5;

    const reserveSeatWithError = () => {
      seatReservationService.reserveSeat(
        invalidAccountId,
        totalSeatsToAllocate
      );
    };

    expect(reserveSeatWithError).to.throw(
      TypeError,
      'accountId must be an integer'
    );
  });

  it('should throw an error for invalid totalSeatsToAllocate', () => {
    const seatReservationService = new SeatReservationService();
    const accountId = 1;
    const invalidTotalSeatsToAllocate = 'invalidTotalSeatsToAllocate';

    const reserveSeatWithError = () => {
      seatReservationService.reserveSeat(
        accountId,
        invalidTotalSeatsToAllocate
      );
    };

    expect(reserveSeatWithError).to.throw(
      TypeError,
      'totalSeatsToAllocate must be an integer'
    );
  });

  it('should not throw errors for valid input', () => {
    const seatReservationService = new SeatReservationService();
    const accountId = 1;
    const totalSeatsToAllocate = 5;

    expect(() => {
      seatReservationService.reserveSeat(accountId, totalSeatsToAllocate);
    }).to.not.throw();
  });
});
