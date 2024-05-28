const db = require('../database/database.js');

// USES tablosuna veri eklemek için controller fonksiyonu
exports.addUses = (req, res) => {
    const { Provider_id, Department_id, Use, Software_id } = req.body;

    // Request body'sinde gerekli bilgilerin olduğunu kontrol etme
    if (!Provider_id || !Department_id || !Use || !Software_id) {
        res.status(400).send('Lütfen geçerli veri sağlayın.');
        return;
    }

    const sql = `INSERT INTO USES (Provider_id, Department_id, Use, Software_id) VALUES (?, ?, ?, ?)`;

    db.query(sql, [Provider_id, Department_id, Use, Software_id], (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Veritabanına veri eklenirken bir hata oluştu.');
            return;
        }
        console.log(`Uses kaydı oluşturuldu: ${results.insertId}`);
        res.status(201).send(`Yeni Uses kaydı oluşturuldu: ${results.insertId}`);
    });
};

// USES tablosundaki tüm verileri çekmek için controller fonksiyonu
exports.getAllUses = (req, res) => {
    const sql = `SELECT * FROM USES`;

    db.query(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Veritabanından veri alınırken bir hata oluştu.');
            return;
        }
        res.status(200).send(rows);
    });
};

// USES tablosundan veri silmek için controller fonksiyonu
exports.deleteUses = (req, res) => {
    const { Provider_id, Department_id, Software_id } = req.body;

    // Request body'sinde gerekli bilgilerin olduğunu kontrol etme
    if (!Provider_id || !Department_id || !Software_id) {
        res.status(400).send('Lütfen geçerli veri sağlayın.');
        return;
    }

    const sql = `DELETE FROM USES WHERE Provider_id = ? AND Department_id = ? AND Software_id = ?`;

    db.query(sql, [Provider_id, Department_id, Software_id], (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Veritabanından veri silinirken bir hata oluştu.');
            return;
        }
        console.log(`Uses kaydı silindi.`);
        res.status(200).send(`Uses kaydı silindi.`);
    });
};
