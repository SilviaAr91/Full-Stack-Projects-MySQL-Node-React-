const connection = require('../config/db');

class DishController {

  getAllDishes = (req, res) => {
    console.log("Solicitud recibida en getAllDishes");
    let sql = 'SELECT * FROM dish';

    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error en la consulta SQL:", err);
        res.status(500).json('Ha habido un error');
      } else {
        console.log("Resultado de la consulta SQL:", result);
        res.status(200).json(result);
      }
    });
  }

  createDish = (req, res) => {
    const { dish_name, dish_description, user_id } = req.body;

    let sql = `INSERT INTO dish (dish_name, dish_description, user_id) VALUES (?, ?, ?)`;

    connection.query(sql, [dish_name, dish_description, user_id], (err, result) => {
      if (err) {
        res.status(500).json('Ha habido un error');
      } else {
        let sql2 = `SELECT * FROM dish WHERE dish_id = ?`;
        connection.query(sql2, [result.insertId], (err2, result2) => {
          if (err2) {
            res.status(500).json('Ha habido un error');
          } else {
            res.status(200).json(result2[0]);
          }
        });
      }
    });
  }

  updateDish = (req, res) => {
    const { id, checked } = req.body;
    console.log(id, checked);

    let sql = `UPDATE dish SET dish_is_disabled = ? WHERE dish_id = ?`;

    connection.query(sql, [!checked, id], (err, result) => {
      if (err) {
        res.status(500).json('Ha fallado algo');
      } else {
        res.status(200).json('Todo ha ido bien');
      }
    });
  }

  editDish = (req, res) => {
    const { id } = req.params;
    const { dish_name, dish_description } = req.body;

    let sql = `UPDATE dish SET dish_name = ?, dish_description = ? WHERE dish_id = ?`;

    connection.query(sql, [dish_name, dish_description, id], (err, result) => {
      if (err) {
        res.status(500).json('Ha fallado algo');
      } else {
        res.status(200).json('Todo ha ido bien');
      }
    });
  }

  getAllDishesFromUser = (req, res) => {
    const { user_id } = req.params;
    let sql = 'SELECT * FROM dish WHERE user_id = ? and dish_is_disabled = 0';

    connection.query(sql, [user_id], (err, result) => {
      if (err) {
        res.status(500).json('Algo ha ido mal');
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  }

  getCategories = (req, res) => {
    let sql = 'SELECT * FROM category';

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json('Algo ha ido mal');
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  }
}

module.exports = new DishController();
