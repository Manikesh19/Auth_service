const express= require('express');
const app= express();
const bodyParser= require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes= require('./routes/index');
const db=require('./models/index');

const UserService = require('./services/user-services');

const prepareAndStartServer= () => {

    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT, async()=> {
        console.log(`Server started on Port: ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({
                alter:true
            });
        }

        // const service= new UserService();
        // const newToken= service.createToken({email:'manikesh123@gmail.com', id:1});
        // console.log("New token is",newToken);
        // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlrZXNoMTIzQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MzY0NDEwNjcsImV4cCI6MTczNjQ0MTA5N30.JbKs5NDKS8rR1UzcuU-6gyHpGj2-qP10prYOU3LuWDE';
        // const response= service.verifyToken(token);
        // console.log(response);
    })
}

prepareAndStartServer();