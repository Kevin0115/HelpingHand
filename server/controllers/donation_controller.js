const connection = require('../config/db_config');
const moment = require('moment');

exports.get_all_donations = async (req, res) => {
  query = {
    text: `select * from donation`
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

exports.create_donation = async (req, res) => {
  const did = Math.floor((Math.random() * 999999) + 1);
  const amount = req.body.amount;
  const rid = req.body.rid;
  const ts = moment().format('YYYY-MM-DD hh:mm:ssA');

  insert_query = {
    text: `insert into donation
            values ($1,$2,$3,$4)`,
    values: [did, amount, rid, ts]
  }

  update_query = {
    text: `update receiver
            set balance = balance + $1
            where rid = $2`,
    values: [amount, rid]
  }

  try {
    const insert_query_result = await connection.query(insert_query);
    const update_query_result = await connection.query(update_query);
    res.send({
      success: true,
      content: 'Donation successfully added.'
    });
  } catch(err) {
    console.error(err);
    res.send({
      success: false,
      content: err.detail
    });
  }
}
