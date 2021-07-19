module.exports = function init(site) {
  const $companies = site.connectCollection("companies")


  $companies.deleteDuplicate({
    code: 1,
    'company.id': 1
  }, (err, result) => {
    $companies.createUnique({
      code: 1,
      'company.id': 1
    }, (err, result) => {})
  })

  site.get_company = function (req) {
    let company = req.session('company')
    return site.fromJson(company)
  }
  site.get_branch = function (req) {
    let branch = req.session('branch')
    return site.fromJson(branch)
  }

  site.onGET({
    name: 'images',
    path: __dirname + '/site_files/images/'
  })

  site.onGET({
    name: "companies",
    path: __dirname + "/site_files/html/index.html",
    parser: "html",
    compress: true
  })

  site.onPOST("/api/companies/add", (req, res) => {
    let response = {
      done: false
    }

    if (!req.session.user) {
      response.error = 'Please Login First';
      res.json(response)
      return
    }

    let companies_doc = req.body
    companies_doc.$req = req
    companies_doc.$res = res
    companies_doc.add_user_info = site.security.getUserFinger({
      $req: req,
      $res: res
    })
    companies_doc.company = site.get_company(req)
    companies_doc.branch = site.get_branch(req)

    $companies.add(companies_doc, (err, doc) => {
      if (!err) {
        response.done = true
        response.doc = doc
      } else {
        response.error = err.message
      }
      res.json(response)
    })
  })

  site.onPOST("/api/companies/update", (req, res) => {
    let response = {
      done: false
    }

    if (!req.session.user) {
      response.error = 'Please Login First'
      res.json(response)
      return
    }

    let companies_doc = req.body

    companies_doc.edit_user_info = site.security.getUserFinger({
      $req: req,
      $res: res
    })
    if (companies_doc.id) {
      $companies.edit({
        where: {
          id: companies_doc.id
        },
        set: companies_doc,
        $req: req,
        $res: res
      }, (err, result) => {
        if (!err) {
          response.done = true
          response.doc = result.doc
        } else {
          response.error = err.message
        }
        res.json(response)
      })
    } else {
      response.error = 'no id'
      res.json(response)
    }
  })

  site.onPOST("/api/companies/view", (req, res) => {
    let response = {
      done: false
    }

    if (!req.session.user) {
      response.error = 'Please Login First'
      res.json(response)
      return
    }

    $companies.findOne({
      where: {
        id: req.body.id
      }
    }, (err, doc) => {
      if (!err) {
        response.done = true
        response.doc = doc
      } else {
        response.error = err.message
      }
      res.json(response)
    })
  })


  site.onPOST("/api/company/view", (req, res) => {
    let response = {
      done: false
    }

    if (!req.session.user) {
      response.error = 'Please Login First'
      res.json(response)
      return
    }

    $companies.findOne({
      where: {
        id: site.get_company(req).id
      }
    }, (err, doc) => {
      if (!err) {
        response.done = true
        response.doc = doc
      } else {
        response.error = err.message
      }
      res.json(response)
    })
  })

  site.onPOST("/api/companies/all", (req, res) => {
    let response = {
      done: false
    } 

    let where = req.body.where || {}
    if (where['code']) {
      where['code'] = new RegExp(where['code'], 'i')
    }
    if (where['name_ar']) {
      where['name_ar'] = new RegExp(where['name_ar'], "i");
    }
    if (where['name_en']) {
      where['name_en'] = new RegExp(where['name_en'], "i");
    }
    if (where['activity']) {
      where['activity.id'] = where['activity'].id;
      delete where['activity']
      delete where.active
    }
    if (where['currency']) {
      where['currency.id'] = where['currency'].id;
      delete where['currency']
      delete where.active
    }
    where['company.id'] = site.get_company(req).id
    where['branch.code'] = site.get_branch(req).code

    $companies.findMany({
      select: req.body.select || {},
      where: where,
      sort: req.body.sort || {
        id: -1
      },
      limit: req.body.limit
    }, (err, docs, count) => {
      if (!err) {
        response.done = true
        response.list = docs
        response.count = count
      } else {
        response.error = err.message
      }
      res.json(response)
    })
  })

  site.onPOST("/api/companies/delete", (req, res) => {
    let response = {
      done: false
    }

    if (!req.session.user) {
      response.error = 'Please Login First'
      res.json(response)
      return
    }

    let id = req.body.id

    if (id) {
      $companies.delete({
        id: id,
        $req: req,
        $res: res
      }, (err, result) => {
        if (!err) {
          response.done = true
          response.doc = result.doc
        } else {
          response.error = err.message
        }
        res.json(response)
      })
    } else {
      response.error = 'no id'
      res.json(response)
    }
  })



  site.get_company_details = function (option, callback) {
    callback = callback || function () {}

    $companies.findOne({
      where: {
        id: option.id
      }
    }, (err, doc) => {
      callback(err, doc)
    })
  }

}