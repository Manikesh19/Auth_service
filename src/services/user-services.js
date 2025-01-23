const jwt =require('jsonwebtoken');
const {JWT_KEY}= require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');
const bcrypt= require('bcrypt');

class UserServices {
    constructor() {
        this.userRepository= new UserRepository;
    }

    async create(data) {
        try {
            const user= await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name=='SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in services layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            const response= await this.userRepository.destroy(userId);
            return true;
        } catch (error) {
            console.log("Something went wrong in services layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            const user= await this.userRepository.getByEmail(email);
            const passwordMatch= this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log("Password doesn't match");
                throw {error : 'Incorrect Password'};
            }
            const newJWT= this.createToken({email: user.email, id:user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response= this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user= await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user corresponding to the token exists'}
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in sign in process");
            throw error;
        }
    }
    createToken(user) {
        try {
            const result= jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }


    verifyToken(token) {
        try {
            const response= jwt.verify(token,JWT_KEY);
            return response;

        } catch (error) {
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }

    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in sevice layer");
            throw error;
        }
    }
}

module.exports= UserServices;