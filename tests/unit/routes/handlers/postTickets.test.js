/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import postTickets from '../../../../src/routes/handlers/postTickets.js';

describe('POST tickets', () => {
  it('should redirect to summary page on successful request', () => {
    const req = {};
    const res = {
      redirect: (template) => {
        expect(template).to.equal('/summary');
      },
    };
    postTickets(req, res);
  });

  it('should render an error page on purchase failure', () => {
    const req = {};
    const res = {
      render: (template, data) => {
        expect(template).to.equal('error');
        expect(data).to.deep.equal({ title: 'Ticket - error' });
      },
    };
    postTickets(req, res);
  });
});
