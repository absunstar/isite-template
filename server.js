const site = require('../isite')({
  port: 9090,
  dir: process.cwd() + '/site_files',
  apps: true,
  apps_dir: process.cwd() + '/apps',
  name: 'Template Site',
  saving_time: 0.5,
  log: true,
  lang: 'ar',
  theme: 'theme_paper',
  help: true,
  stdin: true,
  session: {
    timeout: 60 * 24 * 30,
    enabled: true,
  },
  mongodb: {
    enabled: true,
    host: '127.0.0.1',
    port: '27017',
    userName: null,
    password: null,
    db: 'test',
    collection: 'test',
    limit: 10,
    prefix: {
      db: '',
      collection: '',
    },
    identity: {
      enabled: true,
      start: 1,
      step: 1,
    },
  },
  security: {
    enabled: true,
    keys: ['05a671c66aefea124cc08b76ea6d30bb'],
  },
  cache: {
    enabled: true,
    html: 0,
    txt: 60 * 24 * 30,
    js: 60 * 24 * 30,
    css: 60 * 24 * 30,
    fonts: 60 * 24 * 30,
    images: 60 * 24 * 30,
    json: 60 * 24 * 30,
    xml: 60 * 24 * 30,
  },
});

site.onGET({
  name: '/',
  path: site.dir,
  public: true,
});
site.onGET({
  name: '/',
  path: site.dir + '/html/index.html',
  parser: 'html css js',
});
site.onGET('/new', (req, res) => {
  site.callRoute('/goves', req, res);
});
site.onGET({
  name: '/admin',
  path: site.dir + '/html/index.html',
  parser: 'html css js',
  require: {
    permissions: ['admin', 'api'],
  },
});
site.loadLocalApp('client-side');
site.loadLocalApp('security');
site.loadLocalApp('ui-print');
// site.onWS('/users', (client) => {
//   client.onMessage = function (message) {
//     console.log(message);
//     if (message.type === 'connected') {
//       client.send({ type: 'ready' });
//     }
//   };
//   console.log('New Client ...' + client.ip);
// });

// setInterval(() => {
//   site.ws.clientList.forEach((_client) => {
//     _client.send({ type: 'date', content: Date.now(), count: site.ws.clientList.length });
//   });
// }, 1000 * 5);
// site.sendEmail({
//   from: 'user1@egytag.com',
//   to: 'absunstar@gmail.com',
//   subject: 'test mail 1',
//   message: 'test message 1',
// });
site.run();
