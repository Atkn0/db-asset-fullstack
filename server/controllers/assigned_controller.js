const db = require('../database/database.js');

// Assigned tablosuna veri eklemek için controller fonksiyonu
exports.addAssigned = (req, res) => {
    const { Employee_id, Hardware_id, Assigned_date } = req.body;

    // Request body'sinde gerekli bilgilerin olduğunu kontrol etme
    if (!Employee_id || !Hardware_id || !Assigned_date) {
        res.status(400).send('Lütfen geçerli veri sağlayın.');
        return;
    }

    const sql = `INSERT INTO ASSIGNED (Employee_id, Hardware_id, Assigned_date) VALUES (?, ?, ?)`;

    db.query(sql, [Employee_id, Hardware_id, Assigned_date], (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Veritabanına veri eklenirken bir hata oluştu.');
            return;
        }
        console.log(`Assigned kaydı oluşturuldu: ${results.insertId}`);
        res.status(201).send(`Yeni Assigned kaydı oluşturuldu: ${results.insertId}`);
    });
};

// Assigned tablosundan veri silmek için controller fonksiyonu
exports.deleteAssigned = (req, res) => {
    const { Employee_id, Hardware_id } = req.body;

    // Request body'sinde gerekli bilgilerin olduğunu kontrol etme
    if (!Employee_id || !Hardware_id) {
        res.status(400).send('Lütfen geçerli veri sağlayın.');
        return;
    }

    const sql = `DELETE FROM ASSIGNED WHERE Employee_id = ? AND Hardware_id = ?`;

    db.query(sql, [Employee_id, Hardware_id], (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Veritabanından veri silinirken bir hata oluştu.');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Kayıt bulunamadı.');
            return;
        }
        console.log(`Assigned kaydı silindi.`);
        res.status(200).send('Assigned kaydı silindi.');
    });
};

// Assigned tablosundaki tüm verileri çekmek için controller fonksiyonu
exports.getAllAssigned = (req, res) => {
    const sql = `SELECT * FROM ASSIGNED`;

    db.query(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Veritabanından veri alınırken bir hata oluştu.');
            return;
        }
        res.status(200).send(rows);
    });
};
