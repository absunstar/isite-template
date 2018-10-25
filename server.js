const site = require('isite')({
    port: 8080,
    dir: process.cwd() + '/site_files',
    apps: true,
    apps_dir: process.cwd() + '/apps',
    name: "Template Site",
    saving_time: .5,
    log: true,
    lang: 'ar',
    theme: 'default_theme',
    help: true,
    stdin: true,
    session: {
      timeout: 60 * 24 * 30,
      enabled: true,
      storage: "mongodb",
      db: "sessions",
      collection: "user_sessions"
    },
    mongodb: {
      enabled: true,
      host: "127.0.0.1",
      port: "27017",
      userName: null,
      password: null,
      db: "test",
      collection: "test",
      limit: 10,
      prefix: {
        db: "",
        collection: ""
      },
      identity: {
        enabled: true,
        start: 1,
        step: 1
      }
    },
    security: {
      enabled: true,
      db: "security",
      collection: "users",
      admin: {
        email: "admin@localhost",
        password: "admin"
      },
      users: []
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
      xml: 60 * 24 * 30
    }
  })

site.get({name : '/' , path : site.dir})
site.get({name : '/' , path : site.dir + '/html/index.html' , parser : 'html css js'})



site.loadLocalApp('client-side')
site.loadLocalApp('security')

site.run()