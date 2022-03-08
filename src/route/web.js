import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/',homeController.getHomePage);
    router.get('/crud',homeController.getCRUD);
    router.get('/about',homeController.getAboutPage);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    
    router.get('/hoidanit',(req, res)=>{
        return res.send("Hello world with hoidanit");
    })

    return app.use("/",router);
}

module.exports = initWebRoutes;
