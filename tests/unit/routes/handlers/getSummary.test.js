/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import summaryRoute from '../../../../src/routes/handlers/getSummary.js';

describe('GET summary', () => {
  it('should render the summary screen with the correct data', () => {
    const req = {
      session: {
        tickets: [],
        overallCost: 20,
        details: {
          username: 'Jane_Smith',
        },
      },
    };

    const res = {
      render: (template, data) => {
        expect(template).to.equal('tickets');
        expect(data).to.deep.equal({
          title: 'Tickets - summary',
          tickets: req.session.tickets,
          overallCost: 60,
          username: req.session.details.username,
        });
      },
    };
    summaryRoute(req, res);
  });
});
