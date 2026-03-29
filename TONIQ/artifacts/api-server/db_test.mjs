import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'v:/TONIQ/TONIQ/.env' });
console.log('URI:', process.env.MONGODB_URI);

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('SUCCESS');
  } catch (err) {
    console.error('ERROR:', err.message);
  }
  process.exit(0);
}

test();
