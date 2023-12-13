const express = require('express');
const app = express();
const router = express.Router();
const passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
  .is().min(8) 
  .is().max(20)
  .has().uppercase() 
  .has().lowercase() 
  .has().digits(1) 
  .has().symbols(1)
  .has().not().spaces(); 
router.use(express.json());
router.get('/', (req, res) => {
    res.send('Hello, welcome to the password strength checker!');
  });

router.post('/check-password', (req, res) => {
  const { password } = req.body;

   const isValid = schema.validate(password);

  if (isValid) {
    res.status(200).json({ message: 'Password is strong!' });
  } else {
    res.status(400).json({ message: 'Password does not meet requirements.' });
  }
});
app.use('/', router);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
module.exports = router;
