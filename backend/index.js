const express=require('express')
const bodyParser =require('body-parser');
const cors=require('cors')
const app=express()
const mysql=require('mysql')
const axios = require("axios");
const path = require('path');

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shopay',
    port:'3306'
  })

  // Connect to the database
db.connect((err) => {
  if (err) {
      console.log('Error connecting to database:', err);
      return;
  }
  console.log('Database connection successful');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
// 👇️ serving static files from build directory
app.use(express.static(path.join(__dirname, 'build')));
//app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)



app.get('/api/getCustomAttribute', (req, res) => {
  const id = req.query.id;
  const sqlSelect = "select * from custom_attribute where product_id = ?";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching custom attributes.");
    } else {
      res.send(result);
    }
  });
});

app.get('/api/getProduct', (req, res) => {
  const id = req.query.id;
  const sqlSelect = "select * from product natural join variant where product_id = ?";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching product details.");
    } else {
      res.send(result);
    }
  });
});

app.get('/api/getProductForCart', (req, res) => {
  const id = req.query.id;
  const sqlSelect = "select * from product natural join variant where product_id = ?";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching product details.");
    } else {
      res.send(result);
    }
  });
});

app.get('/api/get', (req, res) => {
  const sqlSelect = "select * from product natural join variant;";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while fetching product details.");
    } else {
      res.send(result);
    }
  });
});

app.get('/api/orders', (req, res) => {
  if (req.headers.authorization) { // Check if Authorization header exists
    const sqlSelect = "SELECT * FROM shopay.order;";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while fetching product details.");
      } else {
        res.send(result);
      }
    });
  } else {
    res.status(401).send("Unauthorized"); // Send a 401 Unauthorized status if Authorization header is missing
  }
});


app.get('/api/offers', (req, res) => {
  axios.get('http://localhost:4001', {
    headers: req.headers,
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(req.headers);
      console.error(error);
      res.send('Something went wrong');
    });
});

// 👇️ catch-all route
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001,()=>{

    console.log('running on port 3001');
})