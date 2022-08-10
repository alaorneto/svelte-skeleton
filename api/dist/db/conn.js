import mongoose from 'mongoose';
const connectionUri = process.env.DATABASE_URI || "mongodb://localhost:27017/";
const databaseName = process.env.DATABASE_NAME || "skeleton";
const connectionString = connectionUri + databaseName;
let connection;
async function getConnection() {
    if (!connection) {
        connect();
    }
    connection = mongoose.connection;
    return connection;
}
async function connect() {
    await mongoose.connect(connectionString);
    console.log("Connected to mongoose instance.");
}
export { connect, getConnection };
