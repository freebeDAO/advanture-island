const WebSocket = require('ws')
const mysql = require("mysql")
const wss = new WebSocket.Server({ port: 8081 });
let currentId = 0

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'dbms'
});


function sendData (x, y) {
  const point = new Point(x, y)
  const insertSql = `INSERT INTO point (x, y, id) VALUES (?, ?, ?)`;
  const values = [point.x, point.y, point.id];
  pool.getConnection((err, connection) => {
    if (err) throw err
    if (point.id === 1) {
      connection.query(`SELECT MAX(id) AS max_id FROM point`, null, (error, results) => {
        if (error) throw error
        let max_id = results[0].max_id !== null ? results[0].max_id : 0
        values[2] = max_id + 1
        currentId = max_id + 1
        connection.query(insertSql, values, (error) => {
          if (error) throw error
          // res.json({
          //   code: '200',
          //   data: "新增成功"
          // })
          connection.release()
        })
      })
    } else {
      connection.query(insertSql, values, (error) => {
        if (error) throw error
        // res.json({
        //   code: '200',
        //   data: "新增成功"
        // })
        connection.release()
      })
    }


  })
}

function getNextId () {
  return ++currentId
}

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.id = getNextId()
  }
}

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (res) {
    // console.log('received: %s', JSON.parse(res));
    let data = JSON.parse(res)
    sendData(data.x, data.y)
    // ws.send(`Server received: ${data.x}`);
  });

  ws.on('close', function () {
    console.log('The client has disconnected.')
  })

  ws.on('error', function (error) {
    console.error('WebSocket error:', error)
  })
})
