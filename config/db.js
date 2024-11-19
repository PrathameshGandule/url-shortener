import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB(){
    try {
        const myConnection = await connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${myConnection.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export { connectDB };