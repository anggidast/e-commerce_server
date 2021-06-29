if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV == 'test') module.exports = app;
else app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
