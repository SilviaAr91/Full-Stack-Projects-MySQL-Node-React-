const connection = require("../config/db");

class WeekSelector {
  getWeeks(req, res) {
    const { user_id } = req.params;

    const sql = `
      SELECT 
        week.week_id, week.name AS week_selector,
        planning.week_id AS selected_week_id
      FROM 
        week
      LEFT JOIN 
        planning ON week.week_id = planning.week_id AND planning.user_id = ?
      ORDER BY 
        week.week_id;
    `;

    connection.query(sql, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json("Algo ha ido mal");
      }

      const weeks = result.map((row) => ({
        week_id: row.week_id,
        week_selector: row.week_selector,
        selected: row.selected_week_id !== null,
      }));

      res.status(200).json(weeks);
    });
  }

  saveWeekSelections(req, res) {
    const { user_id } = req.params;
    const { selections } = req.body;

    
    console.log('Selecciones recibidas:', selections);
    res.json({ message: 'Selecciones guardadas correctamente' });
  }
}

module.exports = new WeekSelector();
 