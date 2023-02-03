const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes');

const { logErrors, errorHandler, boomErrorHandler, handleSQLError } = require('./src/middlewares/error.handler');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());


routerApi(app);

app.use(logErrors);
app.use(handleSQLError);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port);
