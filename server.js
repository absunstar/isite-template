const site = require('isite')({
  port: 80,
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
    storage: 'mongodb',
    db: 'sessions',
    collection: 'user_sessions',
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
    db: 'security',
    collection: 'users',
    admin: {
      email: 'test',
      password: 'test',
    },
    users: [],
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
  require: {
    features: [],
    permissions: [],
  },
});

site.get({
  name: '/',
  path: site.dir,
  require: {
    features: ['browser.edge'],
  },
});
site.get({
  name: '/',
  path: site.dir + '/html/index.html',
  parser: 'html css js'
});
site.get({
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

site.run();
