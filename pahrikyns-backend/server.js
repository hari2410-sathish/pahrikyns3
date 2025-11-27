require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Correct prefix
app.use('/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
