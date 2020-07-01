import mongoose from 'mongoose';

const connection = mongoose.connect('mongodb://localhost/my-bank-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connection;
