const UserRepository = require('../repository/user-repository');

class UserServices {
    constructor() {
        this.userRepository= new UserRepository;
    }

    async create(data) {
        try {
            const user= await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in services layer");
            throw{error}
        }
    }

    async destroy(userId) {
        try {
            const response= await this.userRepository.destroy(userId);
            return true;
        } catch (error) {
            console.log("Something went wrong in services layer");
            throw{error}
        }
    }
}

module.exports= UserServices;