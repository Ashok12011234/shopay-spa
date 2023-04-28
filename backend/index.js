const express=require('express')
const bodyParser =require('body-parser');
const cors=require('cors')
const app=express()
const mysql=require('mysql2')
const axios = require("axios");
const path = require('path');

const db=mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port:process.env.PORT
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
  if (req.headers.hasOwnProperty('x-forwarded-access-token')) { // Check if Authorization header exists
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
  axios.get(process.env.URL, {
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



app.listen(3001,()=>{

    console.log('running on port 3001');
})