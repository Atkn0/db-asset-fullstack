const db = require('../database/database.js');

// Tüm Yazılımları Listeleme
exports.getAllSoftware = (req, res) => {
    const sql = `SELECT * FROM Software`;

    db.query(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Sunucu hatası.');
        } else {
            res.status(200).send(rows);
        }
    });
};

// Yazılımı ID'ye Göre Alma
exports.getSoftwareById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('Geçersiz software ID.');
        return;
    }

    const sql = `SELECT * FROM Software WHERE Software_id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else if (results.length === 0) {
            res.status(404).send('Software bulunamadı.');
        } else {
            res.status(200).send(results[0]);
        }
    });
};

// Yazılım Ekleme
exports.addSoftware = (req, res) => {
    const { Software_id, Software_type } = req.body;

    // Gerekli alanların doldurulup doldurulmadığını kontrol et
    if (!Software_id || !Software_type) {
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

    db.query(sql, [Software_id, Software_type], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else {
            res.status(201).send({ message: 'Yazılım eklendi.', id: results.insertId });
        }
    });
};

// Yazılım Silme
exports.deleteSoftware = (req, res) => {
    const { Software_id } = req.body; // Yazılım ID'sini req.body'den al
    if (!Software_id) {
        res.status(400).send('Geçersiz software ID.');
        return;
    }

    const sql = `DELETE FROM Software WHERE Software_id = ?`;

    db.query(sql, [Software_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send('Yazılım bulunamadı.');
            } else {
                res.status(200).send({ message: 'Yazılım silindi.' });
            }
        }
    });
};
