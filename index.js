const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const passengerRoute = require('./routes/passenger');
const adminRoute = require('./routes/adminUser');
const driverRoute = require('./routes/driver');
const rideRoute = require('./routes/ride');
const vehicleRoute = require('./routes/vehicle');

const app = express();

dotenv.config(); // necessary to use .env variables

// mongo db connection connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connection Successfull!'))
  .catch((err) => {
    console.log(err);
  });

// check api
app.get('/', (req, res) => {
  console.log('test is successfull');
  res.send('Connected');
});

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/passenger', passengerRoute);
app.use('/api/admin', adminRoute);
app.use('/api/driver', driverRoute);
app.use('/api/ride', rideRoute);
app.use('/api/vehicle', vehicleRoute);

app.listen(process.env.PORT || process.env.PORT_NO, () => {
  console.log('backend asdasd server is running at: ', process.env.PORT_NO);
});
