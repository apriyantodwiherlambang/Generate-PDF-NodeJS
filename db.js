const pgp = require("pg-promise")();
require('dotenv').config()

const db = pgp({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

function getTransactionById(transactionId) {
  return db.any(
    "SELECT * FROM mst_tokoemas_trx_detail WHERE id = $1",
    transactionId
  );
}

module.exports = {
  getTransactionById,
};
