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
        return res.status(500).json({
            message:"Something went wrong",
            success:false,
            data:{},
            err:error
        });
    }
}

module.exports= {
    create
}