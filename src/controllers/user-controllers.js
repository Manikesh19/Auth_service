const UserServices= require('../services/user-services');

const userService= new UserServices();

const create = async (req,res) => {
    try {
        const response= await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data:response,
            message:"Successfully created a new user",
            success:true,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message:error.message,
            success:false,
            data:{},
            err:error.explanation
        });
    }
}

const signIn = async(req,res)=> {
    try {
        const response= await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data:response,
            message:"Successfully signed in",
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false,
            data:{},
            err:error
        }); 
    }
}

const isAuthenticated= async(req,res)=> {
    try {
        const token= req.headers['x-access-tokens'];
        const response=await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            err:{},
            message:'User is authenticated and token is valid'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false,
            data:{},
            err:error
        }); 
    }
}

const isAdmin= async(req,res)=> {
    try {
        const response= await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success:true,
            err:{},
            message:"Succesfully fetched whether user is admin or not"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false,
            data:{},
            err:error
        }); 
    }
}
module.exports= {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}