const db = require('../database/database.js');

// Tüm Hardware'ları Alma
exports.getAllHardware = (req, res) => {
  const sql = `SELECT * FROM Hardware`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else {
      res.status(200).send(rows);
    }
  });
};

// Hardware'i ID ile Alma (ID body'den alınıyor)
exports.getHardwareById = (req, res) => {
  const { id } = req.body; // Extract ID from request body

  // Validate ID (optional)
  if (!id || isNaN(parseInt(id))) {
    res.status(400).send('Geçersiz hardware ID.');
    return;
  }

  const sql = `SELECT * FROM Hardware WHERE Hardware_id = ?`;

  db.get(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else if (!result) {
      res.status(404).send('Hardware bulunamadı.');
    } else {
      res.status(200).send(result);
    }
  });
};

exports.addHardware = (req, res) => {
  const {
    Hardware_id, // Get hardware_id from request body
    hardware_type,
    status,
    version,
    licence,
    purchase_date,
    employee_id,
  } = req.body;

  // Verileri boş olmadıklarını ve geçerli formatlarda olduklarını kontrol et (gerekirse)
  // Örnek: tarih formatı kontrolü, lisans uzunluğu kontrolü

  const sql = `
    INSERT INTO Hardware (
      Hardware_id,
      Hardware_type,
      Status,
      Version,
      Licence,
      Purchase_date,
      Employee_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [Hardware_id, hardware_type, status, version, licence, purchase_date, employee_id],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Sunucu hatası.');
      } else {
        res.status(201).send({ message: 'Hardware eklendi.' });
      }
    }
  );
};


// Hardware'i ID ile Silme (ID body'den alınıyor)
exports.deleteHardwareById = (req, res) => {
  const { Hardware_id } = req.body; // Extract ID from request body

  // Validate ID (optional)
  if (!Hardware_id || isNaN(parseInt(Hardware_id))) {
    res.status(400).send('Geçersiz hardware ID.');
    return;
  }

  const sql = `DELETE FROM Hardware WHERE Hardware_id = ?`;

  db.run(sql, [Hardware_id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else {
      if (this.changes === 0) {
        res.status(404).send('Hardware bulunamadı.');
      } else {
        res.status(200).send({ message: 'Hardware silindi.' });
      }
    }
  });
};
