const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const useragent = require('express-useragent');

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(useragent.express());
app.set('trust proxy', true);

const corsOptions = {
    origin: [
        process.env.CLIENT_PROD_URL,
        process.env.CLIENT_DEV_URL,
    ],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '200mb' }));

// Routes
app.use('/url', require('./routes/url.route'));
app.use('/auth', require('./routes/auth.route'));
app.use('/analytics', require('./routes/analytics.route'));
app.use('/tag', require('./routes/tag.route'));
app.use('/summary', require('./routes/summary.route'));
app.use('/admin', require('./routes/admin.route'));
app.use('/formerUrl', require('./routes/formerUrl.route'));

app.get('/', (req, res) => {
    res.send('Hi World from BitWalee at AWS EC2');

})

app.get('/hello', (req, res) => {
    res.send('Hello World from BitWalee at AWS EC2');

})

const defaultPort = 5000;
const PORT = defaultPort;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});