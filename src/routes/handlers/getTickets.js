const ticketPaymentService = require('../../thirdparty/paymentgateway/TicketPaymentService');

module.exports = () => async (req, res) => {
  console.log(ticketPaymentService);
  res.render('tickets', { title: 'Tickets' });
};
