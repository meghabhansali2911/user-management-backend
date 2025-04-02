const { createUserServices, signInUserServices, userListServices, addStudentServices, getStudentServices, editStudentServices, deleteStudentServices, getUserInfoServices, editUserServices } = require("../services/apiServices");

exports.createUserController = async (req, res, next) => {
    try {
        console.log("Request parameters in register user API controller:--", req.body);
        const data = await createUserServices(req);
        res.status(data?.subCode).json(data);
        console.log("Response parameters in register user API controller:--", data);
    } catch (error) {
        console.log("Error in register user API controller:--", error);
        next(error);
    }
};

exports.editUserController = async (req, res, next) => {
    try {
        console.log("Request parameters in edit user API controller:--", req.body);
        const data = await editUserServices(req);
        res.status(data?.subCode).json(data);
        console.log("Response parameters in edit user API controller:--", data);
    } catch (error) {
        console.log("Error in edit user API controller:--", error);
        next(error);
    }
};

exports.signInUserController = async (req, res, next) => {
    try {
        console.log("Request parameters in Sign-in User API controller:--", req.body);
        const data = await signInUserServices(req);
        res.status(data?.subCode).json(data);
        console.log("Response parameters in Sign-in User API controller:--", data);
    } catch (error) {
        console.log("Error in Sign-in User API controller:--", error);
        next(error);
    }
};

exports.getUserInfoController = async (req, res, next) => {
    try {
        console.log("Request parameters in get user profile Info API controller:--", req.body);
        const data = await getUserInfoServices(req);
        res.status(data?.subCode).json(data);
        console.log("Response parameters in get user profile Info API controller:--", data);
    } catch (error) {
        console.log("Error in get user profile Info API controller:--", error);
        next(error);
    }
};

exports.userListController = async (req, res, next) => {
    try {
        console.log("Request parameters in User List API controller:--");
        const data = await userListServices(req);
        res.status(data?.subCode).json(data);
        console.log("Response parameters in User List API controller:--", data);
    } catch (error) {
        console.log("Error in User List API controller:--", error);
        next(error);
    }
};