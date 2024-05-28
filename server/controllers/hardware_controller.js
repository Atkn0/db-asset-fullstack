const db = require('../database/database.js');

// Tüm Hardware'ları Alma
exports.getAllHardware = (req, res) => {
    const sql = `SELECT * FROM Hardware`;

    db.query(sql, [], (err, rows) => {
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

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else if (results.length === 0) {
            res.status(404).send('Hardware bulunamadı.');
        } else {
            res.status(200).send(results[0]);
        }
    });
};

exports.addHardware = (req, res) => {
    const {
        Hardware_type,
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
            Hardware_type,
            Status,
            Version,
            Licence,
            Purchase_date,
            Employee_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [Hardware_type, status, version, licence, purchase_date, employee_id],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Sunucu hatası.');
            } else {
                res.status(201).send({ message: 'Hardware eklendi.', id: results.insertId });
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

    db.query(sql, [Hardware_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send('Hardware bulunamadı.');
            } else {
                res.status(200).send({ message: 'Hardware silindi.' });
            }
        }
    });
};
