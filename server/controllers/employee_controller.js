
const db = require("../database/database")

// Tüm Çalışanları Listeleme Fonksiyonu (no changes needed)

/*
 {
        "Employee_id": 1,
        "Phone_number": "642-445-4671",
        "Gender": "Female",
        "Personal_mail": "vabrahams0@is.gd",
        "Fname": "Leah",
        "Mname": "Vickie",
        "Lname": "Abrahams",
        "Department_id": 1
    },
    */
exports.getAllEmployees = (req, res) => {
  const sql = 'SELECT * FROM Employee';
  db.all(sql, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
};

// Çalışan ID'ye Göre Detay Gösterme Fonksiyonu
exports.getEmployeeById = (req, res) => {
  const id = parseInt(req.body.id); // Get ID from req.body
  const sql = `SELECT * FROM Employee WHERE Employee_id = ?`;
  db.get(sql, [id], (err, result) => {
    if (err) throw err;
    if (!result) {
      res.status(404).send('Çalışan bulunamadı.');
      return;
    }
    res.send(result);
  });
};

exports.createEmployee = (req, res) => {
  const { Employee_id, Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id } = req.body;

  // Validate required fields (adjust as needed)
  if (!Employee_id || !Phone_number || !Gender || !Personal_mail || !Fname || !Mname || !Lname || !Department_id) {
    return res.status(400).send('Hata: Zorunlu alanlar doldurulmalıdır (Employee_id, Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id)');
  }

  const sql = `
      INSERT INTO Employee (Employee_id, Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [Employee_id, Phone_number, Gender, Personal_mail, Fname, Mname, Lname, Department_id];

  db.run(sql, values, function(err) {
    if (err) {
      res.status(500).send('Hata: Çalışan oluşturulamadı');
      return;
    }
    res.status(201).send({ id: this.lastID });
  });
};



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
  db.run(sql, updateValues, function(err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (this.changes === 0) {
      res.status(404).send('Çalışan bulunamadı.');
      return;
    }
    res.send({ message: 'Çalışan bilgileri güncellendi.' });
  });
};



// Çalışan Silme Fonksiyonu
exports.deleteEmployee = (req, res) => {
  const id = parseInt(req.body.id); // Get ID from req.body

  // Check for existing employee before deletion (optional)
  const checkEmployeeSql = `SELECT * FROM Employee WHERE Employee_id = ?`;
  db.get(checkEmployeeSql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    if (!result) {
      return res.status(404).send('Çalışan bulunamadı.');
    }

    // Delete employee if found
    const sql = `DELETE FROM Employee WHERE Employee_id = ?`;
    db.run(sql, [id], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      if (this.changes === 0) {
        return res.status(404).send('Çalışan bulunamadı.');
      }
      res.send({ message: 'Çalışan silindi.' });
    });
  });
};
