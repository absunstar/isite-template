module.exports = function init(site) {

  const $regions = site.connectCollection("regions")

  site.onGET({
    name: "regions",
    path: __dirname + "/site_files/html/index.html",
    parser: "html",
    compress: true
  })

  site.onPOST("/api/regions/add", (req, res) => {
    let response = {}
    response.done = false

    if (!req.session.user) {
      res.json(response)
      return
    }

    let doc = req.body
    doc.$req = req
    doc.$res = res
    doc._created = site.security.getUserFinger({
      $req: req,
      $res: res
    })

    $regions.add(doc, (err, id) => {
      if (!err) {
        response.done = true
      }
      res.json(response)
    })
  })

  site.onPOST("/api/regions/update", (req, res) => {
    let response = {}
    response.done = false

    if (!req.session.user) {
      res.json(response)
      return
    }
    let doc = req.body
    doc._updated = site.security.getUserFinger({
      $req: req,
      $res: res
    })

    if (doc.id) {
      $regions.edit({
        where: {
          id: doc.id
        },
        set: doc,
        $req: req,
        $res: res
      }, err => {
        if (!err) {
          response.done = true
        } else {
          response.error = err.message
        }
        res.json(response)
      })
    } else {
      res.json(response)
    }
  })

  site.onPOST("/api/regions/delete", (req, res) => {
    let response = {}
    response.done = false

    if (!req.session.user) {
      res.json(response)
      return
    }

    let id = req.body.id
    if (id) {
      $regions.delete({
        id: id,
        $req: req,
        $res: res
      }, (err, result) => {
        if (!err) {
          response.done = true
        }
        res.json(response)
      })
    } else {
      res.json(response)
    }
  })

  site.onPOST("/api/regions/view", (req, res) => {
    let response = {}
    response.done = false
    $regions.find({
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

  site.onPOST("/api/regions/all", (req, res) => {
    let response = {}
    response.done = false

    if (!req.session.user) {
      res.json(response)
      return
    }

    let where = req.data.where || {}

    if (where['name']) {
      where['name'] = new RegExp(where['name'], 'i')
    }

    if (where['notes']) {
      where['notes'] = new RegExp(where['notes'], 'i')
    }

    $regions.findMany({
      select: req.body.select || {},
      where: req.body.where,
      sort: {
        id: -1
      }

    }, (err, docs) => {
      if (!err) {
        response.done = true
        response.list = docs
      } else {
        response.error = err.message
      }
      res.json(response)
    })
  })


}