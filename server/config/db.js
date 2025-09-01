const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect('mongodb+srv://ash888848:Meri.1998@cluster0.60izxol.mongodb.net/?retryWrites=true&w=majority');
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = connectDB;

