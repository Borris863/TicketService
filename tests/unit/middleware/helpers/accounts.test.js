/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import getAccounts from '../../../../src/middleware/helpers/accounts.js';

describe('Accounts', () => {
  it('should return an array of user accounts', async () => {
    const accounts = await getAccounts();
    expect(accounts).to.be.an('array');
    expect(accounts).to.have.lengthOf(2);
  });
});
