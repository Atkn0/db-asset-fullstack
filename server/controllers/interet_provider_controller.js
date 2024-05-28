const db = require('../database/database.js');

// Tüm İnternet Sağlayıcılarını Listeleme
exports.getAllInternetProviders = (req, res) => {
    const sql = `SELECT * FROM INTERNET_PROVIDER`;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(500).send('Sunucu hatası.');
      } else {
        res.status(200).send(rows);
      }1
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
  
    db.get(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Sunucu hatası.');
      } else if (!result) {
        res.status(404).send('Sağlayıcı bulunamadı.');
      } else {
        res.status(200).send(result);
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

  db.run(sql, [provider_name], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else {
      res.status(201).send({ message: 'Sağlayıcı eklendi.' });
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

  db.run(sql, [provider_id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sunucu hatası.');
    } else {
      if (this.changes === 0) {
        res.status(404).send('Sağlayıcı bulunamadı.');
      } else {
        res.status(200).send({ message: 'Sağlayıcı silindi.' });
      }
    }
  });
};

// (Diğer internet sağlayıcı fonksiyonları da eklenebilir)
