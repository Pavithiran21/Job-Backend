import Job from '../Models/jobModel.js';


export const CreateJob = async(req,res)=>{
    
    try{
        const {CompanyName,Description,HR_Name,phone_number,email,JobType,JobMode,Qualification,Specialization,Salary,Experience,Role,Location} = req.body; 
        const RegisterJob =  new Job({
            CompanyName:CompanyName,Role:Role,Description:Description,HR_Name:HR_Name,phone_number:phone_number,email:email,
            Location:Location,JobType:JobType,JobMode:JobMode,Qualification:Qualification,Specialization:Specialization,
            Experience:Experience,Salary:Salary
        });
        RegisterJob.datePosted = Date.now();     
        await RegisterJob.save();
        console.log(RegisterJob);
        res.json({status:true,message:"Job profile Created Successfully",data:RegisterJob});
        
        

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Job profile cannot be Created .Something wenrt wrong"});        
    }
}

export const UpdateJob = async(req,res)=>{
    try{
        const {CompanyName,Description,HR_Name,phone_number,email,JobType,JobMode,Qualification,Specialization,Salary,Experience,Role,Location} = req.body; 
        const user = await Job.findOneAndUpdate({ _id: req.params.id },{ new: true });
       if(user){
        user.CompanyName = CompanyName,
        user.Role = Role,
        user.Description = Description,
        user.HR_Name = HR_Name,
        user.phone_number = phone_number,
        user.email = email,
        user.JobType = JobType,
        user.JobMode = JobMode,
        user.Qualification = Qualification,
        user.Specialization = Specialization,
        user.Location = Location,
        user.Salary = Salary,
        user.Experience = Experience

        user.save();
        console.log(user);
        res.json({status:true,message:"Job Updated Successfully",data:user});
       }
       else{
        res.json({status:false,message:"Job cannot be updated"})
       }

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"}); 

    }

}
export const DeleteJob = async(req,res)=>{
    try{
        const user = await Job.findOneAndDelete({ _id: req.params.id },{ new: true });
       if(user){
        res.json({status:true,message:"Job Deleted Successfully",data:user});
       }
       else{
        res.json({status:false,message:"Job cannot be Deleted"})
       }

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"}); 

    }
}

export const ViewJob = async(req,res) =>{
    try{
        const job = await Job.findOne({_id:req.params.id});
        if(job){
            res.json({status:true,message:"Job Viewed Successfully!!!",data:job})
        }
        else{
            res.json({status:false,message:"Job cannot be viewed. Please check it!!!"})
        }

    }catch(err){
        console.log(err);
        res.json({status:false,message:"Something went wrong"});
    }

}

export const AllJob = async(req,res)=>{
    try{
       
        const user = await Job.find({});
       if(user){
        res.json({status:true,message:"All Job Displayed Successfully",data:user});
       }
       else{
        res.json({status:false,message:"Job cannot be displayed"})
       }

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"}); 

    }
}

export const searchJob = async (req, res) => {
    try {
      const role = req.query.Role;
      console.log(role);
      const users = await Job.find({ "Role": { $regex: `${role}`, $options: 'i' }});
      console.log(users);
      res.json({status: true,message: "Job Role search has been done successfully.",data: users});
    } catch (err) {
      console.log(err);
      res.json({status: false,message: "Search Role cannot be done.Something went wrong."});
    }
};

