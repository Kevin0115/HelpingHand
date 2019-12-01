const connection = require('../config/db_config');
const moment = require('moment');

exports.get_all_transactions = async (req, res) => {
  query = {
    text: `select * from transaction`
  }

  try {
    const query_result = await connection.query(query);
    res.send({
      success: true,
      content: query_result.rows
    });
  } catch(err) {
    console.error(err);
    res.send({
      success: false,
      content: err.detail
    });
  }
}

exports.create_transaction = async (req, res) => {
  const tid = Math.floor((Math.random() * 999999) + 1);
  const rid = req.body.rid;
  const mid = req.body.mid;
  const ts = moment().format('YYYY-MM-DD hh:mm:ssA');
  const amount = req.body.amount;

  insert_query = {
    text: `insert into transaction
            values ($1,$2,$3,$4,$5)`,
    values: [tid, rid, mid, ts, amount]
  }

  update_query = {
    text: `update receiver
            set balance = balance - $1
            where rid = $2`,
    values: [amount, rid]
  }

  try {
    const insert_query_result = await connection.query(insert_query);
    const update_query_result = await connection.query(update_query);
    console.log(update_query_result);
    console.log(insert_query_result);
    res.send({
      success: true,
      content: 'Transaction successfully processed.'
    });
  } catch(err) {
    console.error(err);
    res.send({
      success: false,
      content: err.detail
    });
  }
}
