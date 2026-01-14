import 'dotenv/config';
console.log('DATABASE_URL is:', process.env.DATABASE_URL ? 'DEFINED' : 'UNDEFINED');
if (process.env.DATABASE_URL) console.log('Value starts with:', process.env.DATABASE_URL.substring(0, 10));
