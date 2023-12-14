import mongoose from "mongoose";
const {Schema} = mongoose;

const jobSchema = new Schema({
    
    CompanyName: {
        type: String,
    },
    Role: {
        type: String,
    },
    Description:{
        type:String,
    },
    HR_Name: {
        type:String,
    },
    phone_number:{
        type:Number,
    },
    email:{
        type:String,
    },
    Location: {
        type: String,
    },
    JobType: {
        type: String,
        default:'Full-time',
        enum: ['Full-time','Part-time','Internship'],
    },
    JobMode: {
        type: String,
        default:'Work From Office',
        enum: ['Work From Home', 'Work From Office','Remote'],
    },
    Qualification:{
        type: String,
    },
    Specialization:{
        type: String,
    },

    Experience: {
        type: String,
    },
    Salary:{
        type: String,
    },
},{
    timestamps:true
})

export default mongoose.model('jobs', jobSchema);





