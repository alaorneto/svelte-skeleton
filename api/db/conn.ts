import mongoose, { Connection } from 'mongoose';

const connectionUri: string = process.env.DATABASE_URI || "mongodb://localhost:27017/";
const databaseName: string = process.env.DATABASE_NAME || "skeleton";
const connectionString: string = connectionUri + databaseName;

let connection: Connection;

async function getConnection(): Promise<mongoose.Connection> {
  if (!connection) {
    connect();  
  }
  
  connection =  mongoose.connection;

  return connection;
}

async function connect() {
  await mongoose.connect(connectionString);
  console.log("Connected to mongoose instance.");
}

export {connect, getConnection};