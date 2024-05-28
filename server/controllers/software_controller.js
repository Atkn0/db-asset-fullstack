const db = require('../database/database.js');

// Tüm Software'ları Listeleme (unchanged)
exports.getAllSoftware = (req, res) => {
    const sql = `SELECT * FROM Software`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Sunucu hatası.');
        } else {
            res.status(200).send(rows);
        }
    });
};

// Software'i ID'ye Göre Alma (unchanged)
exports.getSoftwareById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('Geçersiz software ID.');
        return;
    }

    const sql = `SELECT * FROM Software WHERE Software_id = ?`;

    db.get(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else if (!result) {
            res.status(404).send('Software bulunamadı.');
        } else {
            res.status(200).send(result);
        }
    });
};

// Yazılım Ekleme (using Software_id, Software_type from req.body)
exports.addSoftware = (req, res) => {
  const { software_id, software_type } = req.body;

  // Validate data (optional)
  if (!software_id || !software_type) {
    res.status(400).send('Gerekli tüm alanlar doldurulmalıdır.');
    return;
  }

  const sql = `
    INSERT INTO Software (
      Software_id,
      Software_type
    )
    VALUES (?, ?)
  `;

  db.run(sql, [software_id, software_type], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else {
      res.status(201).send({ message: 'Yazılım eklendi.' });
    }
  });
};

// Yazılım Silme (using Software_id from req.body)
exports.deleteSoftware = (req, res) => {
  const { software_id } = req.body; // Get software_id from req.body
  if (!software_id) {
    res.status(400).send('Geçersiz software ID.');
    return;
  }

  const sql = `DELETE FROM Software WHERE Software_id = ?`;

  db.run(sql, [software_id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else {
      if (db.changes === 0) {
        res.status(404).send('Yazılım bulunamadı.');
      } else {
        res.status(200).send({ message: 'Yazılım silindi.' });
      }
    }
  });
};
