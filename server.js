const express = require("express")
const mysql = require("mysql")
const app = express()
const port = 8888
let currentId = 0


const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'dbms'
});
app.use(express.urlencoded({ extended: false })) // 配置post请求
app.get('/api/getPoint/:id', (req, res) => {
  console.log('获取到请求')
  // http://example.com/api/users?name=John&age=30
  // const { id } = req.query
  const { id } = req.params
  const values = [id]
  let query = 'SELECT * FROM point WHERE id = ?'
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(query, values, (error, results) => {
      if (error) throw error
      res.json({
        code: '200',
        data: results
      })
      connection.release()
    })
  })
})


// post增加
app.post('/api/addPoint', (req, res) => {
  console.log(req.body);
  const { x, y } = req.body;
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
        connection.query(insertSql, values, (error) => {
          if (error) throw error
          res.json({
            code: '200',
            data: "新增成功"
          })
          connection.release()
        })
      })
    } else {
      connection.query(insertSql, values, (error) => {
        if (error) throw error
        res.json({
          code: '200',
          data: "新增成功"
        })
        connection.release()
      })
    }


  })
})

// 修改
app.put('/api/editPoint', (req, res) => {
  console.log(req.body);
  const { x, y, id } = req.body; // 从请求体中获取数据
  const values = [x, y, id];
  // 准备 SQL 插入语句
  const sql = "UPDATE point SET x = ?, y = ? WHERE id = ?";
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(sql, values, (error, results) => {
      if (error) throw error
      res.json({
        code: '200',
        data: "修改成功"
      })
      connection.release()
    })
  })
})

// 删除
app.delete('/api/deletePoint/:id', (req, res) => {
  const { id } = req.params
  const values = [id]
  const sql = "delete from point where id = ?"
  currentId = 0
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(sql, values, (error, results) => {
      if (error) throw error
      res.json({
        code: '200',
        data: "删除成功",
        results
      })
      connection.release()
    })
  })
})


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


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

const serve = app.listen(port, '127.0.0.1', (res) => {
  console.log(`服务器 ${serve.address().address}:${serve.address().port}开启成功!`)
})
