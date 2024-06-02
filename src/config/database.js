import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection Error:' ));
db.once('open', () =>{
    console.log('Connected to MondoDB');
})

export default db;