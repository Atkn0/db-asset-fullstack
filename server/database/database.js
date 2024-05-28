const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'yeni_parolanız',
  database: 'new_schema'
};

const db = mysql.createConnection(dbConfig);

db.connect(err => {
  if (err) {
    console.error('Bağlantı kurulamadı:', err);
    return;
  }
  console.log('MySQL bağlantısı kuruldu!');
});

module.exports = db;
