// import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService.js';

export default () => async (req, res) => {
  // const test = new TicketPaymentService();
  // test.makePayment('red', 23);
  // console.log(test);
  res.render('tickets', { title: 'Tickets' });
};
