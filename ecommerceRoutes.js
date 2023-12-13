const express = require('express');
const app = express();
const router = express.Router();
const PORT = 5000;

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

const authenticateUser = (req, res, next) => {
  const isLoggedIn = true; 
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
};


router.get('/dashboard', authenticateUser, (req, res) => {
  
  res.send('Welcome to the dashboard!');
});


router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(loggerMiddleware);

const products = [
  { id: 1, name: 'Product 1', price: 25 },
  { id: 2, name: 'Product 2', price: 30 },
  { id: 3, name: 'Product 3', price: 40 }
];


router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/cart/add/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const selectedProduct = products.find(product => product.id === productId);
  
    if (selectedProduct) {
     
      res.send(`Added ${selectedProduct.name} to the cart.`);
    } 
    else {
        
        const newProduct = req.body;
        newProduct.id = products.length + 1;
        products.push(newProduct);
        res.send(`Added ${newProduct.name} to the cart.`);
      }
    });

router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  res.json(product); 
});

router.post('/login', (req, res) => {
   const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

app.use('/', router);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = router;
