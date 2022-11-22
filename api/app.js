const { readFileSync } = require('fs');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const cors = require('cors');
// const logger = require('./logger');
const dotenv = require('dotenv').config({ path: './config/.env' });
// files
const authorize = require('./authorize');
const { products, people } = require('./data');

// routes
const auth = require('./routes/auth');
const employeeRouter = require('./routes/employee');
const customerRouter = require('./routes/customer');

// middleware && setups - setup static files and also middleware
const app = express();
app.use(express.json());
// app.use(express.static('./public'));
app.use(morgan('tiny'));
// app.use(cors());

/**
 * app.use(logger) if you want middleware to apply to all
 * app.use('/api', logger); // for all paths after api/
 */
// app.use([logger, authorize]); // used for all

// middleware routes
app.use('/login', auth);
app.use('/api/people', employeeRouter); // employees
app.use('/api/store', customerRouter); // customers

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1> <a href="/about">About</a> <a href="/people">People</a> <a href="/api/store">Customer</a>');
});

// app.get('/about', (req, res) => {
//   res.send('<h1> About Page</h1><a href="/">Home</a>');
// });

// app.get('/api/items', (req, res) => {
//   console.log(req.user);
//   res.send('Items');
// });

// app.get('/api/products', (req, res) => {
//   res.json(
//     products.map((prod) => {
//       const { id, name, image } = prod;
//       return { id, name, image };
//     })
//   );
// });

// app.get('/api/products/:productId', (req, res) => {
//   console.log(req.params);
//   const singleProduct = products.find((product) => {
//     return product.id === Number(req.params.productId);
//   });
//   if (!singleProduct) {
//     return res.status(404).send('Product does not exist');
//   }
//   return res.json(singleProduct);
// });

// app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
//   console.log(req.params);

//   return res.json({ review: 'review does not exist' });
// });

// app.get('/api/v1/query', (req, res) => {
//   console.log(req.params);
//   console.log(req.query);
//   const { search, limit } = req.query;
//   let sortedProducts = [...products];

//   if (search) {
//     sortedProducts = sortedProducts.filter((product) => {
//       return product.name.startsWith(search);
//     });
//   }
//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, Number(limit));
//   }
//   if (sortedProducts.length < 1) {
//     // res.status(200).send('no products match your search');
//     return res.status(200).json({ success: true, data: [] });
//   }
//   res.status(200).json(sortedProducts);
// });

// app.all('*', (req, res) => {
//   res.status(404).send('<h1>Resource not found </h1>');
// });

app.listen(5000, () => {
  console.log(`Node-express training listening on port 5000`);
});

//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen
