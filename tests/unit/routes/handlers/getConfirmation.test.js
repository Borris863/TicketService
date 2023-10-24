/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import confirmationRoute from '../../../../src/routes/handlers/getConfirmation.js';

describe('GET confirmation', () => {
  it('should render the confirmation screen with the correct data', () => {
    const req = {
      session: {
        tickets: [],
        overallCost: 20,
        details: {
          email: 'test@example.com',
        },
      },
    };

    const res = {
      render: (template, data) => {
        expect(template).to.equal('tickets');
        expect(data).to.deep.equal({
          title: 'Tickets - confirmation',
          numOfSeats: 2,
          tickets: req.session.tickets,
          overallCost: req.session.overallCost,
          orderDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
          orderNumber: uuidv4(),
          email: req.session.details.email,
        });
      },
    };
    confirmationRoute(req, res);
  });
});
