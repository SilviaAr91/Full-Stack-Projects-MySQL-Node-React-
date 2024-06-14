const connection = require("../config/db");

class IndexController {

  getIcons = (req, res) => {

    let sql = 'SELECT * FROM icon'

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err)
      }else {
        res.status(200).json(result)
      }
    })

  }

}

module.exports = new IndexController()

