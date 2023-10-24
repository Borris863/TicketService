// add accounts so that the username can be checked against them and an accountId can be found
async function getAccounts() {
  const accounts = [
    { username: 'Jane_Smith', accountId: 12 },
    { username: 'John_Doe', accountId: 10 },
  ];
  return accounts;
}

export default getAccounts;
