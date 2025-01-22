import mongoose from "mongoose";
const itemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollnumber:{
        type:String,
        required:true
    },
    studentclass:{
        type:String,
        required:true
    },
    enrollmentYear:{
        type:Number,
        required:true
    }
});
const itemModel=mongoose.model('items',itemSchema)
export default itemModel