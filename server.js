const site = require('../isite')({
  port: 9090,
  dir: process.cwd() + '/site_files',
  apps: true,
  apps_dir: process.cwd() + '/apps',
  backup_dir: process.cwd() + '/backup',
  name: 'Template Site',
  savingTime: 0.5,
  log: true,
  lang: 'en',
  theme: 'theme_paper',
  help: true,
  stdin: true,
  ipLookup: true,
  cluster: {
    enabled: false,
    count: 4,
  },
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

site.onGET(
  {
    name: '/list',
    public: true,
  },
  (req, res) => {
    res.render(
      'list.html',
      {
        users: [
          { id: 100, name: 'amr', phone: '01090061266', country: { city: 'tanta' } },
          { name: 'heba', phone: '0000000000000000', phones: ['1', '2', '3'] },
        ],
      },
      {
        parser: 'html css js',
      }
    );
  }
);

site.onGET({
  name: '/',
  path: site.dir,
  public: true,
});

site.onGET(
  {
    name: '/',
  },
  (req, res) => {
    res.render('index.html', { siteName: req.word('My Site Name') }, { parser: 'html css js', encript: '123' });
  }
);

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

site.onPOST({ name: '/api/upload2', public: true }, (req, res) => {
  let response = {
    file: {},
    done: !0,
  };

  if ((file = req.files.fileToUpload)) {
    response.file = file;
    if (site.isFileExistsSync(file.filepath)) {
      let docs = [];
      if (file.originalFilename.like('*.xlsx|*.xls')) {
        let workbook = site.xlsx.readFile(file.filepath);
        docs = site.xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        response.docs = docs;
      }
    }
  } else {
    response.done = !1;
    response.error = 'no file uploaded';
  }

  res.json(response);
});

site.loadLocalApp('client-side');
site.loadLocalApp('security');
site.loadLocalApp('ui-print');

site.onGET({ name: 'temp', overwrite: true }, (req, res) => {
  res.render({ path: __dirname + '/temp.html' });
  site.fsm.off({ path: __dirname + '/temp.html' });
});

// site.off({ name: 'temp' });

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

if ((db = false)) {
  $employees = site.connectCollection('employees');
  $messages = site.connectCollection('messages');
  $contacts = site.connectCollection('contacts');

  let t1 = Date.now();
  //$employees.drop();
  let emp = { name: 'Employee Name ', company: 'HR Company' };
  for (let index = 0; index < 1000; index++) {
    emp.index = index;
    $employees.add({ ...emp }, (err, doc) => {
      console.log(err || 'add index: ' + index + ' , id: ' + doc.id);
      if (!err && doc) {
        doc.date = new Date();
        $employees.update(doc, (err, result) => {
          console.log(err || 'update index: ' + index + ' , id: ' + result.doc.id);
          if (!err && result.doc) {
            $employees.find({ _id: result.doc._id }, (err, doc2) => {
              console.log(err || 'find index: ' + index + ' , id: ' + doc2.id);
              if (!err && doc2) {
                $employees.delete(doc2, (err, result2) => {
                  console.log(err || result2);
                  if (index == 999) {
                    console.log((Date.now() - t1) / 1000 + ' sec');
                  }
                });
              }
            });
          }
        });
      }
    });
  }
}

// setInterval(() => {
//   $employees.count({}, (err, count) => {
//     console.log(err || 'docs count : ' + count + '\n');
//   });
//   $employees.findMany({ limit: 5000 }, (err, docs) => {
//     if (!err && docs) {
//       docs.forEach((doc) => {
//         delete doc.id;
//         delete doc._id;
//       });
//       $employees.addMany(docs, (err, docs2) => {
//         console.log(err || 'new docs coumt : ' + docs2.length + '\n');
//       });
//     }
//   });
// }, 1000 * 1);
// setInterval(() => {
//   // site.databaseList.forEach((db) => {
//   //   console.log(db.db.driverInfo());
//   // });
//   let cpu = process.cpuUsage();
//   cpu.user = Math.floor(cpu.user / (1024 * 1024)) + '%';
//   cpu.system = Math.floor(cpu.system / (1024 * 1024)) + '%';

//   console.log(cpu);
//   for (const [key, value] of Object.entries(process.memoryUsage())) {
//     console.log(`Memory usage by ${key}, ${Math.floor(value / 1000000)} MB `);
//   }
//   console.log('\n----------------------------------\n');
// }, 1000 * 5);
// $employees.add({ name: 'mongodb 6' }, (err, doc) => {
//   if (err) {
//     console.log(err);
//   }
//   if (doc) {
//     $employees.find({ id: doc.id }, (err, doc2) => {
//       console.log(err, doc2);
//       doc2.name2 = 'edit mongodb 6'
//       $employees.update(doc2)
//     });
//   }
// });

// $messages.drop();
// $contacts.drop();

site.onGET('/add', (req, res) => {
  site.readFile(__dirname + '/big-json.json', (err, file) => {
    file.json();
    if (file.isJson) {
      let data = file.content;
      for (const key in data.messages) {
        $messages.addAll(data.messages[key]);
      }
      $contacts.addAll(data.chats);
      res.json({ done: true, stat: file.stat, count: file.count });
    }
  });
});

site.onGET('/add2', (req, res) => {
  let data = site.readFileSync(__dirname + '/big-json.json');
  let json = JSON.parse(data);
  return res.json({ done: true });
  if (data) {
    console.log('Data Reading ...');
    for (const key in data.messages) {
      $messages.addAll(data.messages[key]);
    }
    $contacts.addAll(data.chats);
  } else {
    console.log('xxxxxxxxxxxxxxxxxxxxxxx');
  }
});
site.onGET('db', (req, res) => {
  site.restoreDB(null, (err, options) => {
    if (!err) {
      res.download(options.path);
    } else {
      res.json(err);
    }
  });
});
// site.cmd('git pull', (data) => {
//   console.log(data);
// });
// site.backupDB(null, (err, options) => {
//   console.log(err, options);
//   if (!err) {
//     site.restoreDB(null, (err, options) => {
//       console.log(err, options);
//     });
//   }
// });

// site.restoreDB(null, (err, options) => {
//   console.log(err, options);
// });

// site.sendMail({
//   enabled : true,
//   host : 'smtp.office365.com',
//   port : 587,
//   username : 'ms.two@digisummits.com',
//   password : 'Fan63941',
//   type : 'smpt',
//   from : 'ms.two@digisummits.com',
//   to : 'ABarakat@digisummits.com',
//   subject : 'smpt mail service',
//   message : '<h1> Hello From Smart Code </h1>'
// })

// let file = site.fs.readFileSync(__dirname + '/mct.pdf');
// site.pdf.PDFDocument.load(file).then((doc) => {
//   let form = doc.getForm();
//   let nameField = form.getTextField('Name');
//   nameField.setText('Amr Barakat');
//   doc.save().then((new_file) => {
//     site.fs.writeFileSync(__dirname + '/mct2.pdf', new_file);
//   });
// });
// let s = site.readFileSync(__dirname + '/test.js');
// site.requireFromString(s);

// let $test = site.connectCollection('test');
// let arr = [];
// for (let index = 0; index < 1; index++) {
//   arr.push({
//     $exists: true,
//     name: '$' + index,
//     phone: index,
//     magic: {
//       $name: '22222',
//       name: '$2222',
//     },
//   });
// }
// $test.insertAll(arr, (err, docs) => {
//   console.log(err || docs);
// });

function testWS() {
  let client = {
    reconnectCount: 0,
  };

  client.ws = new site.ws.lib('ws://143.110.168.152/isite');
  client.sendMessage = function (message) {
    client.ws.send(JSON.stringify(message));
  };
  client.ws.on('open', function () {
    console.log('open');
    setInterval(() => {
      client.sendMessage({ type: 'chat', user: Math.random(), date: Date.now() });
    }, 1000 * 10);
  });
  client.ws.on('ping', function () {
    console.log('ping');
  });
  client.ws.on('close', function (e) {
    console.log('close');
  });
  client.ws.on('error', function (err) {
    console.log('error', err);
    client.ws.close();
  });

  client.ws.on('message', function (event) {
    console.log('message');
  });
  return client;
}

// for (let index = 0; index < 10000; index++) {
//   testWS();
// }

// for (let index = 0; index < 10; index++) {
//   setTimeout(() => {
//     site.storage('xxx', new Date().getTime());
//     console.log(site.storage('xxx'));
//   }, 1000 * index);
// }

// for (let index = 0; index < 100; index++) {
//   let emp = site.connectCollection('employees');
//   emp.add({name : 'test'} , (err , doc)=> console.log(err || doc.id));
// }

// site.startProxy({ port: 12345 , name : 'Test Proxy' });

site.validateRequest = function (req, res, next) {
  console.log(req.url);
  next(req, res);
};

site.validateRoute = function (req, res, next) {
  console.log(req.route.name);
  next(req, res);
};

site.run();
// site.sessions.$collection.deleteAll({ createdTime: { $lt: new Date().getTime() - 1000 * 60 * 60 * 24 * 30 } });
