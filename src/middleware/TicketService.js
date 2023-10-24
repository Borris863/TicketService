/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import InvalidPurchaseException from './InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import functionHelper from './helpers/functionHelper.js';

export default class TicketService {
  purchaseTickets(accountId, ticketTypeRequests) {
    try {
      const ticketPurchase = new TicketPaymentService();
      // workout total amount for ticket
      const ticketTotal = ticketTypeRequests.reduce(
        (a, b) => +a + +b.totalCost,
        0
      );

      // make request to the payment service
      ticketPurchase.makePayment(accountId, ticketTotal);
    } catch (error) {
      throw new InvalidPurchaseException(
        `Error making payment: ${error.message}`
      );
    }

    try {
      const seatReservationService = new SeatReservationService();
      // workout correct number of seats to reserve
      const totalNumOfSeats =
        functionHelper.calculateCorrectNumOfSeats(ticketTypeRequests);

      // make request to the reserve seat service
      seatReservationService.reserveSeat(accountId, totalNumOfSeats);
    } catch (error) {
      throw new InvalidPurchaseException(
        `Error reserving seats: ${error.message}`
      );
    }
  }
}
