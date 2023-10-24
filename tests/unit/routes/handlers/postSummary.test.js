/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';

import postSummary from '../../../../src/routes/handlers/postSummary.js';

describe('POST summary', () => {
  it('should redirect to the confirmation page on successful purchase', () => {
    const req = {};
    const res = {
      redirect: (template) => {
        expect(template).to.equal('/confirmation');
      },
    };
    postSummary(req, res);
  });

  it('should render an error page on purchase failure', () => {
    const req = {};
    const res = {
      render: (template, data) => {
        expect(template).to.equal('error');
        expect(data).to.deep.equal({ title: 'Ticket - error' });
      },
    };
    postSummary(req, res);
  });
});
