const connection = require('../config/db_config');

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
  const did = req.body.did;
  const amount = req.body.amount;
  const rid = req.body.rid;
  const ts = req.body.ts;

  query = {
    text: `insert into donation
            values ($1,$2,$3,$4)`,
    values: [did, amount, rid, ts]
  }

  try {
    const query_result = await connection.query(query);
    console.log(query_result);
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
