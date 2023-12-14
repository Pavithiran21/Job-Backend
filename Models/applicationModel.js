import mongoose from 'mongoose';
const {Schema} = mongoose;

const applicationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        
    },
    MyProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
        
    },
    JobProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
    },
    isApplied:{
        type:Boolean
    },
    isViewed:{
        type:Boolean
    },
    isShortlisted:{
        type:Boolean
    },
    isRejected:{
        type:Boolean
    },
    ApplicationStatus:{
        type:String,
        enum:["Applied","Viewed","Shortlisted","Rejected"],
        default:"Applied"
    },
    AppliedDate:{
        type:Date,
    },
    ViewedDate:{
        type:Date,
    }
    
},
{timestamps:true}
);


export default mongoose.model('applications', applicationSchema);


