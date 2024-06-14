const connection = require("../config/db");
const { get } = require("../routes/dishes.js");
const { generateExcel } = require("../utils/generateExcel.js");
const { findMax } = require("../utils/utils");
require("../utils/utils.js");

class menuController {
  getAllMenusAdmin = (req, res) => {
    const { user_id } = req.params;

    console.log(req.params);

    let sql = `SELECT menu.*, icon.icon_name FROM menu, icon WHERE menu.icon_id = icon.icon_id AND menu.user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json("Algo ha ido mal");
      } else {
        res.status(200).json(result);
      }
    });
  };

  createMenu = (req, res) => {
    const { user_id, name, icon_id } = req.body;

    const values = [user_id, user_id, name, icon_id];

    console.log(req.body);

    let sql = `INSERT INTO menu (user_id, menu_id, name, icon_id)
    VALUES (
        ?,
        (SELECT IFNULL(MAX(menu_id) + 1, 1) FROM (SELECT menu_id FROM menu WHERE user_id = ?) AS subquery),
        ?,
        ?
    );`;
    // Conexión a la base de datos para insertar el nuevo menú creado
    connection.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json("Ha fallado algo");
      } else {
        let sql2 =
          "SELECT menu.*, icon.icon_name FROM menu, icon WHERE menu.icon_id = icon.icon_id AND user_id = ? AND menu_id = (SELECT max(menu_id) FROM menu where user_id = ?)";

        // Conexión  a la base de datos para traernos ese nuevo menú insertado y devolverlo al front
        connection.query(sql2, [user_id, user_id], (err2, result2) => {
          if (err2) {
            res.status(500).json("Ha fallado algo");
          } else {
            res.status(200).json(result2[0]);
          }
        });
      }
    });
  };

  getOneMenu = (req, res) => {
    const { user_id, menu_id } = req.params;

    console.log(req.params);

    let sql = `SELECT menu.*, icon.icon_name FROM menu, icon
    WHERE menu.icon_id = icon.icon_id
    AND menu.menu_id = ?
      AND menu.user_id = ?;`;

    connection.query(sql, [menu_id, user_id], (err, result) => {
      if (err) {
        res.status(500).json("Ha fallado algo");
      } else {
        res.status(200).json(result[0]);
      }
    });
  };

  editMenu = (req, res) => {
    const { user_id, menu_id, name, icon_id } = req.body;

    let sqlCheckMenu = "SELECT * FROM menu WHERE user_id = ? AND menu_id = ?";

    connection.query(
      sqlCheckMenu,
      [user_id, menu_id],
      (errCheck, resultCheck) => {
        if (errCheck) {
          res.status(500).json("Ha fallado algo 1");
        } else if (!resultCheck) {
          res.status(404).json("No existe este menú");
        } else {
          let sqlUpdate =
            "UPDATE menu SET name = ?, icon_id = ? WHERE user_id = ? AND menu_id = ?";
          connection.query(
            sqlUpdate,
            [name, icon_id, user_id, menu_id],
            (errUpdate, resultUpdate) => {
              if (errUpdate) {
                res.status(500).json("Ha fallado algo 2");
              } else {
                res.status(200).json("Cambios realizados correctamente");
              }
            }
          );
        }
      }
    );
  };

  deleteMenu = (req, res) => {
    const { user_id, menu_id } = req.params;

    let sqlDelete = "DELETE FROM menu WHERE user_id = ? AND menu_id = ?";

    connection.query(sqlDelete, [user_id, menu_id], (err, result) => {
      if (err) {
        res.status(500).json("Ha fallado algo");
      } else {
        res.status(200).json("Se ha eliminado el menú correctamente");
      }
    });
  };

  getPlanning = (req, res) => {
    const { user_id, menu_id } = req.params;
    const sqlPlanning = `
    SELECT 
      planning.*,
      dish.dish_name,
      week.week_id
    FROM 
      week
    LEFT JOIN 
      planning ON planning.week_id = week.week_id AND planning.user_id = week.user_id AND planning.menu_id = week.menu_id
    LEFT JOIN 
      dish ON planning.dish_id = dish.dish_id
    WHERE 
      week.user_id = ? 
      AND week.menu_id = ?
    ORDER BY 
        week.week_id, 
        planning.day_id, 
        planning.category_id;`;

    connection.query(sqlPlanning, [user_id, menu_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      const num_of_weeks = result.length > 0 ? result[0].num_of_weeks : 0;
      console.log(result);

      console.log(num_of_weeks);
      const sqlNumberDays =
        "SELECT number_of_days FROM menu WHERE menu_id = ? AND user_id = ?";

      connection.query(
        sqlNumberDays,
        [menu_id, user_id],
        (err2, resultDays) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          const numOfDays = resultDays[0]?.number_of_days;
          if (!numOfDays) {
            return res.status(404).json("No se ha podido encontrar");
          }

          let planning = [];
          let weeks = {};

          // Inicialización de los días en las semanas
          result.forEach((row) => {
            const weekId = row.week_id;
            if (!weeks[weekId]) {
              weeks[weekId] = { days: {} };
              for (let day = 1; day <= numOfDays; day++) {
                weeks[weekId].days[day] = [];
              }
            }
          });

          // Llenamos las semanas con datos
          result.forEach((row) => {
            const weekId = row.week_id;
            const dayId = row.day_id;
            if (weeks[weekId] && weeks[weekId].days[dayId]) {
              weeks[weekId].days[dayId].push({
                category_id: row.category_id,
                dish_id: row.dish_id,
                dish_name: row.dish_name,
              });
            }
          });

          // Preparamos el array final de planning
          for (let weekId in weeks) {
            let weekData = {
              week: weekId,
              days: [],
            };
            for (let dayId = 1; dayId <= numOfDays; dayId++) {
              weekData.days.push({
                day: dayId,
                data: weeks[weekId].days[dayId],
              });
            }
            planning.push(weekData);
          }
          res.json(planning);
        }
      );
    });
  };

  addWeek = (req, res) => {
    console.log(req.body);
    const { week, user, menu, name } = req.body;

    const values = [user, menu, week, name];

    let sql =
      "INSERT INTO week (user_id, menu_id, week_id, name) VALUES (?, ?, ?, ?);";

    connection.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json("Semana insertada correctamente");
      }
    });
  };

  deleteWeek = (req, res) => {
    const { user_id, menu_id, week_id } = req.params;

    const values = [user_id, menu_id, week_id];

    let sql =
      "DELETE FROM week WHERE user_id = ? AND menu_id = ? AND week_id = ?;";

    connection.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json("Algo ha fallado");
      } else {
        res.status(200).json("Semana eliminada correctamente");
      }
    });
  };

  editWeek = (req, res) => {
    const { user_id, menu_id, week_id, day_id, dish_id, category_id } =
      req.body.dataPre;
    const { newDishId, newCategoryId } = req.body;

    const values = [
      newDishId,
      newCategoryId,
      user_id,
      menu_id,
      week_id,
      day_id,
      dish_id,
      category_id,
    ];

    let sql = `UPDATE planning SET dish_id = ?, category_id = ? WHERE user_id = ? AND menu_id = ? AND week_id = ? AND day_id = ? AND dish_id = ? AND category_id = ?;`;

    connection.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Algo ha ido mal", error: err });
      } else {
        res.status(200).json("Plato actualizado correctamente");
      }
    });
  };

  duplicarMenu = (req, res) => {
    const { user_id, menu_id, week_id } = req.params;
    const { new_week_id, new_name } = req.body; // nuevo id de la semana y el nuevo nombre de la semana duplicada
    // Paso 1: Seleccionar todos los registros de la semana original en la tabla 'planning'
    let sqlSelect = `
      SELECT planning.*, dish.dish_name
      FROM planning
      LEFT JOIN dish ON planning.dish_id = dish.dish_id
      WHERE planning.user_id = ? AND planning.menu_id = ? AND planning.week_id = ?
    `;
    connection.query(
      sqlSelect,
      [user_id, menu_id, week_id],
      (errSelect, resultSelect) => {
        if (errSelect) {
          return res
            .status(500)
            .json("Algo ha fallado al seleccionar la semana original");
        }
        // Paso 2: Insertar la nueva semana en la tabla 'week'
        let sqlInsertWeek =
          "INSERT INTO week (user_id, menu_id, week_id, name) VALUES (?, ?, ?, ?)";
        connection.query(
          sqlInsertWeek,
          [user_id, menu_id, new_week_id, new_name],
          (errInsertWeek) => {
            if (errInsertWeek) {
              return res
                .status(500)
                .json("Algo ha fallado al insertar la nueva semana");
            }
            // Paso 3: Insertar todos los registros de la semana original en la nueva semana
            if (resultSelect.length > 0) {
              let values = resultSelect.map((row) => [
                user_id,
                menu_id,
                new_week_id,
                row.day_id,
                row.category_id,
                row.dish_id,
              ]);
              // Esquema para el comando SQL de la inserción
              let sqlInsertPlanning = `
            INSERT INTO planning (user_id, menu_id, week_id, day_id, category_id, dish_id)
            VALUES ?
          `;
              connection.query(
                sqlInsertPlanning,
                [values],
                (errInsertPlanning) => {
                  if (errInsertPlanning) {
                    return res
                      .status(500)
                      .json(
                        "Algo ha fallado al duplicar los registros de la planificación"
                      );
                  } else {
                    return res
                      .status(200)
                      .json("Semana duplicada correctamente");
                  }
                }
              );
            } else {
              return res
                .status(200)
                .json(
                  "Semana duplicada correctamente, pero no había registros de planificación en la semana original"
                );
            }
          }
        );
      }
    );
  };

  addDishes = (req, res) => {
    const { user_id, menu_id, week_id, day_id, dishes } = req.body;

    const sqlInsertPlanning = `
        INSERT INTO planning (user_id, menu_id, week_id, day_id, category_id, dish_id)
        VALUES (?, ?, ?, ?, ?, ?)`;

    if (dishes.length > 1) {
      dishes.forEach((data) => {
        const { category, dish_id } = data;
        console.log(category, dish_id);

        connection.query(
          sqlInsertPlanning,
          [user_id, menu_id, week_id, day_id, category, dish_id],
          (err, result) => {
            if (err) {
              return res.status(500).json(err);
            }
          }
        );
      });
    } else {
      const { category, dish_id } = dishes[0];
      connection.query(
        sqlInsertPlanning,
        [user_id, menu_id, week_id, day_id, category, dish_id],
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
        }
      );
    }

    res.status(200).json({ message: "Dishes added successfully" });
  };

  duplicateMenu = (req, res) => {
    const { user_id, menu_id } = req.params;
    const { planning, week_days, icon_id, menu_name, week_length } = req.body;

    // Desestructuración de la data enviada desde el front
    // Consulta para insertar el nuevo menú y obtener el nuevo menu_id
    let sql_insert_menu = `
      INSERT INTO menu (user_id, menu_id, name, number_of_days, icon_id)
      SELECT ?, MAX(menu_id) + 1, ?, ?, ?
      FROM menu
      WHERE user_id = ?;
    `;
    let values_menu = [user_id, menu_name, week_days, icon_id, user_id];
    // Consulta para obtener el nuevo menu_id
    let sql_get_new_menu_id = `
      SELECT MAX(menu_id) AS menu_id
      FROM menu
      WHERE user_id = ?;
    `;
    connection.query(sql_insert_menu, values_menu, (err_menu, result_menu) => {
      if (err_menu) {
        console.error("Error al insertar el nuevo menú", err_menu);
        res.status(500).json("Error al insertar el nuevo menú");
        return;
      }
      connection.query(
        sql_get_new_menu_id,
        [user_id],
        (err_get_id, result_get_id) => {
          if (err_get_id) {
            console.error("Error al obtener el nuevo menu_id", err_get_id);
            res.status(500).json("Error al obtener el nuevo menu_id");
            return;
          }
          let new_menu_id = result_get_id[0].menu_id;
          // Consulta de inserción para la tabla week
          let sql_week = `INSERT INTO week (user_id, menu_id, week_id, name) VALUES (?, ?, ?, ?)`;
          for (let i = 0; i < week_length; i++) {
            let week_id = planning[i].week; // Esto asegura que week_id sea único en cada iteración
            let week_name = `DUP_week${week_id}`; // Nombre dinámico para cada semana
            let values_week = [user_id, new_menu_id, week_id, week_name];
            connection.query(sql_week, values_week, (err_week, result_week) => {
              if (err_week) {
                console.error("Error al insertar los datos week", err_week);
                res.status(500).json("Error al insertar los datos week");
                return;
              } else {
                let sql_plan = `INSERT INTO planning (user_id, menu_id, week_id, day_id, category_id, dish_id)
                SELECT
                  planning.user_id,
                  ${new_menu_id} AS menu_id, -- Nuevo menu_id
                  planning.week_id,
                  planning.day_id,
                  planning.category_id,
                  planning.dish_id
                FROM
                  week
                LEFT JOIN
                  planning ON planning.week_id = week.week_id AND planning.user_id = week.user_id AND planning.menu_id = week.menu_id
                LEFT JOIN
                  dish ON planning.dish_id = dish.dish_id
                WHERE
                  week.user_id = ${user_id}
                  AND week.menu_id = ${menu_id}
                ORDER BY
                  week.week_id,
                  planning.day_id,
                  planning.category_id;`;
                if (i < 1) {
                  connection.query(
                    sql_plan,
                    (err_planning, result_planning) => {
                      if (err_planning) {
                        console.log(
                          "error al insertar data de planning",
                          err_planning
                        );
                      }
                    }
                  );
                }
              }
            });
          }
          res.status(200).json("Duplicación de menú completada con éxito");
        }
      );
    });
  };

  getExcel = (req, res) => {
    const planning = req.body;
    generateExcel(planning);
  };
}

module.exports = new menuController();
