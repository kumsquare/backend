import mongoose from 'mongoose'
const connectDB=async () => {
    try{
        await mongoose.connect('mongodb+srv://kumkumheralgi18:EfasmK*eA3@cluster0.ygtbr.mongodb.net/')
        console.log('Connected to database...')
    }
    catch(err){
        console.log(`${err}`);
    }
    
}
export default connectDB;