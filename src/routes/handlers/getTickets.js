export default () => async (req, res) => {
  // render the main ticket page
  res.render('tickets', { title: 'Tickets' });
};
