const db = require("../database/database");

// Tüm Çalışanları Listeleme Fonksiyonu
exports.getAllEmployees = (req, res) => {
  const sql = 'SELECT * FROM Employee';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Veritabanı hatası:', err); // Hata mesajını konsola yazdırın
      res.status(500).send({ message: 'Veritabanı hatası' }); // Hata mesajı içeren bir JSON cevabı gönderin
      return; // Hata durumunda fonksiyondan çıkın
    }
    res.send(rows);
  });
};

// Çalışan ID'ye Göre Detay Gösterme Fonksiyonu
exports.getEmployeeById = (req, res) => {
  const id = parseInt(req.body.id); // Get ID from req.body
  const sql = `SELECT * FROM Employee WHERE Employee_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      res.status(500).send({ message: 'Veritabanı hatası' });
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Çalışan bulunamadı.');
      return;
    }
    res.send(results[0]);
  });
};

// Çalışan Oluşturma Fonksiyonu
exports.createEmployee = (req, res) => {
  const { Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id } = req.body;

  // Validate required fields (adjust as needed)
  if (!Phone_number || !Gender || !Personal_mail || !Fname || !Lname || !Department_id) {
    return res.status(400).send('Hata: Zorunlu alanlar doldurulmalıdır (Phone_number, Gender, Personal_mail, Fname, Lname, Department_id)');
  }

  const sql = `
      INSERT INTO Employee (Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      res.status(500).send('Hata: Çalışan oluşturulamadı');
      return;
    }
    res.status(201).send({ id: result.insertId });
  });
};

// Çalışan Güncelleme Fonksiyonu
exports.updateEmployee = (req, res) => {
  const { Employee_id, Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id } = req.body;

  // Construct update statement based on provided fields
  let sql = `UPDATE Employee SET `;
  let updateValues = [];

  // Check for presence of each field and add to update statement
  if (Phone_number) {
    sql += `Phone_number = ?, `;
    updateValues.push(Phone_number);
  }
  if (Gender) {
    sql += `Gender = ?, `;
    updateValues.push(Gender);
  }
  if (Personal_mail) {
    sql += `Personal_mail = ?, `;
    updateValues.push(Personal_mail);
  }
  if (Fname) {
    sql += `Fname = ?, `;
    updateValues.push(Fname);
  }
  if (Mname) {
    sql += `Mname = ?, `;
    updateValues.push(Mname);
  }
  if (Lname) {
    sql += `Lname = ?, `;
    updateValues.push(Lname);
  }
  if (Department_id) {
    sql += `Department_id = ?, `;
    updateValues.push(Department_id);
  }

  // Remove trailing comma and space from the update statement (if any)
  sql = sql.slice(0, -2);

  // Add WHERE clause with the extracted Employee_id
  sql += ` WHERE Employee_id = ?`;
  updateValues.push(Employee_id); // Use the extracted Employee_id

  // Execute update query
  db.query(sql, updateValues, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Çalışan bulunamadı.');
      return;
    }
    res.send({ message: 'Çalışan bilgileri güncellendi.' });
  });
};

// Çalışan Silme Fonksiyonu
exports.deleteEmployee = (req, res) => {
  const id = parseInt(req.body.id); // Get ID from req.body

  // Delete employee if found
  const sql = `DELETE FROM Employee WHERE Employee_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Çalışan bulunamadı.');
    }
    res.send({ message: 'Çalışan silindi.' });
  });
};
