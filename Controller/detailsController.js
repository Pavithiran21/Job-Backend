import Portfolio from '../Models/detailsModel.js';
import Application from '../Models/applicationModel.js';
import Job from '../Models/jobModel.js';
import User from '../Models/userModel.js';



export const AdminDashboard = async(req,res)=>{
  try{
      const application = await Application.find();
      const applicationSelected = application.filter(job => job.isShortlisted === true).length;
      const jobs = await Job.find();
      const profile = await Portfolio.find();
      const totalApplications = application.length;
      const totalProfile = profile.length;
      const totalJobs = jobs.length;

      console.log(jobs);
      console.log(application);
      console.log(profile);
      res.json({
          status: true, message:"Admin Dashboard  has shown Successfully",
          data: {
              totalJobs,totalApplications,totalProfile,applicationSelected
          }
      });
      
   }
   catch (err) {
       console.log(err);
       res.json({ status: false, message:"Admin Dashboard cannot be shown.Something went wrong" });
   }
}




export const CreatePortfolio = async(req,res)=>{
  try{
    const {
      firstname,lastname,email,gender,contact,address,martialStatus,dob,city,pincode,
      sslc,sslcboard,sslcPassedout,sslcPercent,hsc,hscboard,hscPercent,hscPassedout,
      graduation,coursetype,university,collegename,specialization,qualification,percentage,collegepassedout,
      skill,languages,projectname,projectdescription,linkedinProfile,experience,yearofexperience,companyname,designation,userId} = req.body; 


    

    const job = await Portfolio.findOne({userId:userId});
    console.log(job);
    if(!job){
        const RegisterJob =  new Portfolio({
            
                firstname:firstname,
                lastname:lastname,
                email:email,
                contact:contact,
                gender:gender,
                martialStatus:martialStatus,
                dob:dob,
                address:address,
                city:city,
                pincode:pincode,
                sslc:sslc,
                sslcboard:sslcboard,
                sslcPassedout:sslcPassedout,
                sslcPercent:sslcPercent,
                hsc:hsc,
                hscboard:hscboard,
                hscPassedout:hscPassedout,
                hscPercent:hscPercent,
                graduation:graduation,
                qualification:qualification,
                specialization:specialization,
                university:university,
                coursetype:coursetype,
                collegename:collegename,
                percentage:percentage,
                collegepassedout:collegepassedout,
                skill:skill,
                languages:languages,
                projectname:projectname,
                projectdescription:projectdescription,
                linkedinProfile:linkedinProfile,
                experience:experience,
                yearofexperience:yearofexperience,
                companyname: companyname, 
                designation: designation,
                userId:userId  
        });

        await RegisterJob.save();
        console.log(RegisterJob);
      res.json({status:true,message:"Portfolio Created Successfully",data:RegisterJob});
    }
    else{
        res.json({status:false,message:"Portfolio already exists or invalid"});
    }

  }
  catch(err){
    console.log(err);
    res.json({status:false,message:"Something wenrt wrong"});        
  }
}


export const UpdatePortfolio = async (req, res) => {
  try {
     // Get the ID from the request parameters
    const {
      // Get the updated data from the request body
      firstname,lastname,gender,contact,address,martialStatus,dob,city,pincode,
      sslc,sslcboard,sslcPassedout,sslcPercent,hsc,hscboard,hscPercent,hscPassedout,
      graduation,coursetype,university,collegename,specialization,qualification,percentage,collegepassedout,
      skill,languages,projectname,projectdescription,linkedinProfile,experience,yearofexperience,companyname,designation
    } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.json({ status: false, message: 'User not found. Please log in again.' });
    }

    const userEmail = user.email;
    // Find the portfolio by ID and update it
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id:req.params.id},
      {
       
          
            firstname:firstname,
            lastname:lastname,
            email: userEmail,
            phone: contact,
            gender:gender,
            martialStatus: martialStatus,
            dob:dob,
            address: address,
            pincode:pincode,
            city: city,
            sslc:sslc,
            sslcboard:sslcboard,
            sslcPassedout: sslcPassedout,
            sslcPercent: sslcPercent,
            hsc:hsc,
            hscboard:hscboard,
            hscPassedout:hscPassedout,
            hscPercent:hscPercent,
            graduation:graduation,
            qualification:qualification,
            specialization:specialization,
            university:university,
            coursetype:coursetype,
            collegename:collegename,
            percentage:percentage,
            collegepassedout: collegepassedout,
            skill: skill,
            languages: languages,
            projectname: projectname,
            projectdescription: projectdescription,
            linkedinProfile: linkedinProfile,
            experience:experience,
            yearofexperience:yearofexperience,
            companyname:companyname,
            designation: designation        
      },
      { new: true } 
    );
    portfolio.updatedAt = Date.now();
    portfolio.save();
    console.log(portfolio);
    if (portfolio) {
      res.json({ status: true, message: "Portfolio Updated Successfully", data: portfolio });
    } else {
      res.json({ status: false, message: "Portfolio cannot be updated" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Something went wrong" });
  }
};
export const DeletePortfolio = async(req,res)=>{
    try{
      const user = await Portfolio.findOneAndDelete({_id:req.params.id});
      if(user){
       res.json({status:true,message:"Portfolio Deleted Successfully",data:user});
      }
      else{
       res.json({status:false,message:"Portfolio cannot be Deleted"})
      }

    }
    catch(err){
      console.log(err);
      res.json({status:false,message:"Something wenrt wrong"}); 

    }
}
export const MyPortfolio = async(req,res)=>{
    try{
       
        const user = await Portfolio.findOne({_id:req.params.id});
        console.log(user);
       if(user){
        res.json({status:true,message:" Portfolio Viewed Successfully",data:user});
       }
       else{
        res.json({status:false,message:"Portfolio cannot be viewed."})
       }

    }
    catch(err){
        console.log(err);
        res.json({status:false,message:"Something wenrt wrong"}); 

    }
}
export const AllPortfolio = async(req,res)=>{
    try{
       
      const user = await Portfolio.find({});
      console.log(user);
      if(user){
       res.json({status:true,message:"All Portfolio Displayed Successfully",data:user});
      }
      else{
       res.json({status:false,message:"Portfolio cannot be displayed"})
      }

    }
    catch(err){
      console.log(err);
      res.json({status:false,message:"Something wenrt wrong"}); 

    }
}

export const searchPortfolio = async (req, res) => {
  try {
    const firstname = req.query.firstname;
    console.log(firstname);
    // const users = await Portfolio.find({ "firstname": {$regex: `${firstname}`, $options: 'i'} });
    const users = await Portfolio.find({firstname : { $regex: `${firstname}`, $options: 'i' } });
    console.log(users);
    res.json({status: true,message: "User search details are retrieved successfully.",data: users});
  } catch (err) {
    console.log(err);
    res.json({status: false,message: "Failed to retrieve user search details. Something went wrong."});
  }
};

export const CheckPortfolio = async(req,res)=>{
  try{
     
      const user = await Portfolio.find({userId:req.params.userId});
      console.log(user);
     if(user){
      res.json({status:true,message:" My Profile found  Successfully",data:user});
     }
     else{
      res.json({status:false,message:"Profile  cannot be find. Please try again"})
     }

  }
  catch(err){
      console.log(err);
      res.json({status:false,message:"Something wenrt wrong"}); 

  }
}

