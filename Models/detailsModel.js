import mongoose from "mongoose";
const {Schema} = mongoose;

const portfolioSchema = new Schema({   
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    }, 
    email:{
        type:String,
    },
    contact:{
        type:String, 
    },
    gender:{
        type:String,
        enum:["Male","Female" ]
    },
    martialStatus:{
        type:String,
        enum: ["Single","Married"]
    },
    dob:{
        type:Date,
    },
    address: {
        type:String,

    },
    city:{
        type:String,
    },
    pincode:{
        type:Number,
        
    },
    sslc:{
        type:String,
    },
    sslcboard:{
        type:String,
        
        enum:["State-Board","CBSE-Board"]
    },
    sslcPercent:{
        type:String,
    },
    sslcPassedout:{
        type:String,
    },
    hsc:{
        type:String,
    },
    hscboard:{
        type:String,
        enum:["State-Board","CBSE-Board"]
    },
    hscPercent:{
        type:String,
    },
    hscPassedout:{
        type:String,
    },
    graduation:{
        type:String,
        enum:["Under-Graduate","Post-Graduate"]
    },
    qualification:{
        type:String,
    },
    specialization:{
        type:String,
    },
    coursetype:{
        type:String,
        enum:["Full-time","Part-time"],
        
    },
    collegename:{
        type:String,
    },
    university:{
        type:String,
    },
    percentage:{
        type:String,
    },
    collegepassedout:{
        type:String, 
    },
    skill:{
        type:String,
    },
    languages:{
        type:String,
    },
    projectname: {
        type:String,
    },
    projectdescription:{
        type: String,
    },
    linkedinProfile:{
        type: String,
    },
    experience: {
        type: String,
        enum: ["Experience","Fresher"],
    },
    companyname: {
        type: String,
    },
    yearofexperience: {
        type: String,
    },
    designation: {
        type: String,
    },
    isCreated:{
        type:Boolean,
        default:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    updatedAt:{
        type:Date,
    },

   
},
{
    timestamps: true
})

export default mongoose.model('profile', portfolioSchema);


