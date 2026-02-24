const site = require('../isite')({});

const apiId = 25389950;
const apiHash = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const session = new site.telegram.sessions.StoreSession('telegram-data');

const rl = site.readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  console.log('Loading interactive example...');

  const client = site.connectTelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => new Promise((resolve) => rl.question('Please enter your number: ', resolve)),
    password: async () => new Promise((resolve) => rl.question('Please enter your password: ', resolve)),
    phoneCode: async () => new Promise((resolve) => rl.question('Please enter the code you received: ', resolve)),
    onError: (err) => console.log(err),
  });

  console.log('You should now be connected.');

  client.session.save();
  await client.connect();

  if (await client.checkAuthorization()) {
    console.log('I am logged in!');
  } else {
    console.log('I am connected to telegram servers but not logged in with any account/bot');
  }

  client.addEventHandler(async (e) => {
    console.log(e);
    if (e.message) {
      if (e.message.message.like('*hello*')) {
        let chat = await client.getInputEntity(e.message.peerId);
        let res = await client.sendMessage(chat, { message: 'Hello , iam busy now ' });
        console.log(res);
      }
    }
  });

  // await client.sendMessage('me', { message: 'Hello!' });
})();
