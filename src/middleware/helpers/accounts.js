async function getAccounts() {
  const accounts = [
    { username: 'janeSmith', accountId: 12 },
    { username: 'johnDoe', accountId: 10 },
  ];
  return accounts;
}

module.exports = {
  getAccounts,
};
