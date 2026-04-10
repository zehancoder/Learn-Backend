import mongoose from "mongoose";
const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('connect to DB successfully');
    });
}
export default connectToDB;