import mongoose from "mongoose";
const {Schema} = mongoose;
const UserSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default: "user",
        enum:["admin","user"],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        required: true,
        default: false
    },
    
    activeToken:{
        type:String,
        required:false,
        
    },
    activeExpires:{
        type:Date
    },
    resetToken:{
        type:String,
        required:false,
        
    },
    resetExpires:{
        type:Date
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },  
},
{
    timestamps: true
});

export default mongoose.model('users', UserSchema);

