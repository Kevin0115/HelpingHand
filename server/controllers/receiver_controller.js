const connection = require('../config/db_config');

exports.get_all_receivers = async (req, res) => {
  query = {
    text: `select * from receiver`
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

exports.get_receiver = async (req, res) => {
  const rid = req.params.rid;
  query = {
    text: `select *
            from receiver
            where rid = $1`,
    values: [rid]
  }

  try {
    const query_result = await connection.query(query);
    res.send({
      success: true,
      content: query_result.rows[0]
    })
  } catch(err) {
    console.error(err);
    res.send({
      success: false,
      content: err.detail
    });
  }
}

exports.create_receiver = async (req, res) => {
  const rid = Math.floor((Math.random() * 999999) + 1);
  const uname = req.body.uname;
  const pin = req.body.pin;
  const question = req.body.question;
  const answer = req.body.answer;

  query = {
    text: `insert into receiver
            values ($1,$2,0,$3,$4,$5)`,
    values: [rid, uname, pin, question, answer]
  }

  try {
    const query_result = await connection.query(query);
    console.log(query_result);
    res.send({
      success: true,
      content: rid
    });
  } catch(err) {
    console.error(err);
    res.send({
      success: false,
      content: err.detail
    });
  }
}