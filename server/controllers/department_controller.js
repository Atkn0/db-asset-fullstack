const db = require('../database/database.js');

// Departman Adını ID ile Alma
// Departman Adını ID ile Alma
exports.getDepartmanNameById = (req, res) => {
    const { Department_id } = req.body; // Extract ID from request body
  
    // Validate ID (optional)
    if (!Department_id || isNaN(parseInt(Department_id))) {
      res.status(400).send('Geçersiz departman ID.');
      return;
    }
  
    const sql = `SELECT department_name FROM Department WHERE department_id = ?`;
  
    db.get(sql, [Department_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Sunucu hatası.');
      } else if (!result) {
        res.status(404).send('Departman bulunamadı.');
      } else {
        res.status(200).send({ department_name: result.department_name });
      }
    });
  };
  
  
  // Tüm Departmanları Alma
  exports.getAllDepartmants = (req, res) => {
    const sql = `SELECT Department_id, Department_name FROM Department`;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Sunucu hatası.');
      } else {
        res.status(200).send(rows);
      }
    });
  };