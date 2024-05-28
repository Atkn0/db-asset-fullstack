const db = require('../database/database.js');

// Tüm İnternet Sağlayıcılarını Listeleme
exports.getAllInternetProviders = (req, res) => {
    const sql = `SELECT * FROM INTERNET_PROVIDER`;

    db.query(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send('Sunucu hatası.');
        } else {
            res.status(200).send(rows);
        }
    });
};

// İnternet Sağlayıcısını ID'ye Göre Alma
exports.getInternetProviderById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('Geçersiz sağlayıcı ID.');
        return;
    }

    const sql = `SELECT * FROM INTERNET_PROVIDER WHERE Provider_id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else if (results.length === 0) {
            res.status(404).send('Sağlayıcı bulunamadı.');
        } else {
            res.status(200).send(results[0]);
        }
    });
};

// Yeni İnternet Sağlayıcı Ekleme
exports.addInternetProvider = (req, res) => {
    const { provider_name } = req.body; // Sağlayıcı adını body'den al

    // Sağlayıcı adının boş olmadığını ve 50 karakterden az olduğunu kontrol et
    if (!provider_name || provider_name.length > 50) {
        res.status(400).send('Geçersiz sağlayıcı adı.');
        return;
    }

    const sql = `INSERT INTO INTERNET_PROVIDER (Provider_name) VALUES (?)`;

    db.query(sql, [provider_name], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else {
            res.status(201).send({ message: 'Sağlayıcı eklendi.', id: results.insertId });
        }
    });
};

// İnternet Sağlayıcısını ID'ye Göre Silme
exports.deleteInternetProviderById = (req, res) => {
    const { provider_id } = req.body; // Sağlayıcı ID'sini body'den al

    // Sağlayıcı ID'sinin geçerli bir tamsayı olduğundan emin ol
    if (!provider_id || isNaN(parseInt(provider_id))) {
        res.status(400).send('Geçersiz sağlayıcı ID.');
        return;
    }

    const sql = `DELETE FROM INTERNET_PROVIDER WHERE Provider_id = ?`;

    db.query(sql, [provider_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Sunucu hatası.');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send('Sağlayıcı bulunamadı.');
            } else {
                res.status(200).send({ message: 'Sağlayıcı silindi.' });
            }
        }
    });
};
