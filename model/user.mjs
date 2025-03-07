import mongoose,{sanitizeFilter} from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    date:{
        type:Date,
        default:Date.now
    }
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next();
})
const userModel = mongoose.model('users',userSchema);
export default userModel;
