/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import getTickets from '../../../../src/routes/handlers/getTickets.js';

describe('GET tickets page', () => {
  it('should render the get tickets', () => {
    const req = {};
    const res = {
      render: (template, data) => {
        expect(template).to.equal('tickets');
        expect(data).to.deep.equal({ title: 'Tickets' });
      },
    };
    getTickets(req, res);
  });
});
