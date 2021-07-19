const site = require('isite')({
  port: 8080,
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
  require: {
    features: ['browser.social'],
  },
});
site.onGET({
  name: '/',
  path: site.dir + '/html/index.html',
  parser: 'html css js',
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

site.run();


