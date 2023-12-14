import Application from '../Models/applicationModel.js';



export const AddApplication = async (req, res) => {
  try {
    const {userId,MyProfile,JobProfile} = req.body;
    

    

    const existingApplication = await Application.findOne({
        userId:userId,
        JobProfile:JobProfile,
        isApplied:true
        });
    console.log(existingApplication);
    
    if (!existingApplication) {
      
        const newApplication = new Application({
            userId:userId,
            MyProfile:MyProfile,
            JobProfile:JobProfile,
            isApplied: true,
            AppliedDate: Date.now(),
            
        });
      await newApplication.save();
      console.log(newApplication);
      return res.json({
         status: true,message: "Application created successfully",data: newApplication,
        });
    } else {
      return res.json({
        status: false,message: "Application already created for this job.",
      });
    }
  } catch (err) {
    console.error(err);
    res.json({
      status: false,
      message: "Cannot apply for the job and add an application. Something went wrong.",
    });
  }
};


export const ViewApplications = async (req,res) =>{
    
    try{
        const view = await Application.findOne({_id:req.params.id});
        console.log(view);
        if(view){
            res.json({status:true,message:"Application Viewed Successfully",data:view});
        }
        else{
            res.json({status:false,message:"Application cannot viewed.Please try again"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Job profile cannot be Created .Something wenrt wrong"});        
    }
    
}



export const DeleteApplications = async (req,res) =>{
    
    try{
        const delet = await Application.findOneAndDelete({_id:req.params.id});
        console.log(delet);
        if(delet){
            res.json({status:true,message:"Application Deleted Successfully",data:delet});
        }
        else{
            res.json({status:false,message:"Application cannot be deleted.Please try again"});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something went wrong"});        
    }
}

export const AllApplications = async (req,res) =>{
    try{
        const app = await Application.find({});
        console.log(app);
        res.json({status:true,message:"All Application got successfully",data:app});

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Cannot get all application. Something went wrong!!!"});
    }
}




export const MyApplications = async (req, res) => {
    try {
       
        const applications = await Application.find({userId:req.params.userId});

        console.log("Applications:", applications);

        if (applications.length > 0) {
            res.json({ status: true, message: "All My Applications retrieved successfully", data: applications });
        } else {
            res.json({ status: false, message: "No applications found for the user" });
        }
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.json({ status: false, message: "Something went wrong while fetching applications" });
    }
};









export const ApplicantDashboard = async(req,res)=>{
    try{
        const application = await Application.find({userId:req.params.userId});
        const totalApplications = application.filter(job =>job.isApplied === true).length;
        const viewedApplications = application.filter(job =>job.isViewed === true).length;
        const shortlistApplications = application.filter(job =>job.isShortlisted === true).length;
        const rejectedApplications = application.filter(job =>job.isRejected === true).length;
        console.log(`totalApplications:${totalApplications}`);
        console.log(`viewedApplications:${viewedApplications}`);
        console.log(`shortlistApplications:${shortlistApplications}`);
        console.log(`rejectedApplications:${rejectedApplications}`);
        res.json({
            status: true,
            message: "Applicant Dashboard has been shown successfully ",
            data: {
                totalApplications,
                viewedApplications,
                shortlistApplications,
                rejectedApplications
            }
        });
    }
    catch(err){
        console.log(err);
        res.json({
            status: false,
            message: "Applicant Dashboard cannot be shown. Something went wrong"
        });

    }
} 




export const UpdateApplicationStatus = async (req, res) => {
  try {
    // Find the application by ID
    const application = await Application.findByIdAndUpdate(req.params.id);
    console.log("Id:",application);

    if (!application) {
      return res.json({ status: false, message: "Application not found" });
    }

    let updateMessage = "";

    // Switch based on the current application status
    switch (application.ApplicationStatus) {
      case "Applied":
        application.ApplicationStatus = "Viewed";
        application.isViewed = true;
        application.ViewedDate = Date.now();
        updateMessage = "Viewed";
        break;
      case "Viewed":
        application.ApplicationStatus = "Shortlisted";
        application.isShortlisted = true;
        updateMessage = "Shortlisted";
        break;
      case "Shortlisted":
        application.ApplicationStatus = "Rejected";
        application.isRejected = true;
        updateMessage = "Rejected";
        break;
      default:
        return res.json({ status: false, message: "Invalid application status" });
    }

    // Save the updated application status
    await application.save();

    return res.json({
      status: true,
      message: `Updated Application Status as ${updateMessage} Successfully`,
      data: application,
    });
  } catch (err) {
    console.error(err);
    res.json({ status: false, message: "Something went wrong" });
  }
};


