const db = require('../database/database.js');

// Departman Adını ID ile Alma
exports.getDepartmanNameById = (req, res) => {
  const { Department_id } = req.body; // Extract ID from request body

  // Validate ID (optional)
  if (!Department_id || isNaN(parseInt(Department_id))) {
    res.status(400).send('Geçersiz departman ID.');
    return;
  }

  const sql = `SELECT Department_name FROM Department WHERE Department_id = ?`;

  db.query(sql, [Department_id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else if (results.length === 0) {
      res.status(404).send('Departman bulunamadı.');
    } else {
      res.status(200).send({ department_name: results[0].Department_name });
    }
  });
};

// Tüm Departmanları Alma
exports.getAllDepartmants = (req, res) => {
  const sql = `SELECT Department_id, Department_name FROM Department`;

  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else {
      res.status(200).send(rows);
    }
  });
};

// Departman Ekleme
exports.addDepartment = (req, res) => {
  const { Department_name } = req.body;

  // Validate department name (optional)
  if (!Department_name || Department_name.trim() === '') {
    res.status(400).send('Lütfen departman adı belirtin.');
    return;
  }

  const sql = `INSERT INTO Department (Department_name) VALUES (?)`;

  db.query(sql, [Department_name], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Departman oluşturulamadı.');
      return;
    }
    res.status(201).send({ message: 'Yeni departman oluşturuldu.', id: result.insertId });
  });
};

// Departman Silme
exports.deleteDepartment = (req, res) => {
  const { Department_id } = req.body;

  // Validate department ID (optional)
  if (!Department_id || isNaN(parseInt(Department_id))) {
    res.status(400).send('Geçersiz departman ID.');
    return;
  }

  const sql = `DELETE FROM Department WHERE Department_id = ?`;

  db.query(sql, [Department_id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Departman silinemedi.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Departman bulunamadı.');
      return;
    }
    res.status(200).send({ message: 'Departman silindi.' });
  });
};
