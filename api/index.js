const express = require('express');
const db = require("./app/models");
const products = require("./app/routes/product.routes");
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.use('/api/products', products);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
db.sequelize.sync({force: true}).then(() => {
  db.Product.create({
    name: "Produto 1",
    description: "Desc 1",
    qnt: 10,
    price: 10.15
  });
  db.Product.create({
    name: "Produto 2",
    description: "Desc 2",
    qnt: 20,
    price: 20.15
  });
  db.Product.create({
    name: "Produto 3",
    description: "Desc 3",
    qnt: 30,
    price: 30.15
  });
  db.Product.create({
    name: "Produto 4",
    description: "Desc 4",
    qnt: 40,
    price: 40.15
  });
  db.Product.create({
    name: "Produto 5",
    description: "Desc 5",
    qnt: 50,
    price: 50.15
  });
  db.Product.create({
    name: "Produto 6",
    description: "Desc 6",
    qnt: 60,
    price: 60.15
  });
  db.Product.create({
    name: "Produto 7",
    description: "Desc 7",
    qnt: 70,
    price: 70.15
  });
  db.Product.create({
    name: "Produto 8",
    description: "Desc 8",
    qnt: 80,
    price: 80.15
  });
  db.Product.create({
    name: "Produto 9",
    description: "Desc 9",
    qnt: 90,
    price: 90.15
  });
  db.Product.create({
    name: "Produto 10",
    description: "Desc 10",
    qnt: 100,
    price: 100.15
  });
  db.Product.create({
    name: "Produto 11",
    description: "Desc 11",
    qnt: 110,
    price: 110.15
  });
});
*/