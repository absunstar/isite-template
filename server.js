const site = require('isite')({
    port: 8080
})


site.get({name : '/js' , path : site.dir + '/js' , parser : 'js'})
site.get({name : '/' , path : site.dir + '/html/index.html' , parser : 'html css js'})

site.run()