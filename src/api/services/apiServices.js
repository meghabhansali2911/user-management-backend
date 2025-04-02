const bcrypt = require('bcryptjs');
const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const { createToken } = require('../../utility/token');
const { hashedPassword } = require('../../utility/hashPassword');

exports.createUserServices = async (req, res) => {
    try {
        const { name, password, role, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { subCode: 400, status: false, message: "Email already registered." };
        }

        const hashPassword = await hashedPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        const token = createToken({ id: newUser._id, role: newUser.role })

        return {
            subCode: 201,
            status: true,
            message: "User registered successfully.",
            data: {
                token,
                user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
            }
        };

    } catch (error) {
        console.error("An error occurred during user registration:", error);
        return {
            subCode: 500,
            status: false,
            message: error.message,
            data: {}
        };
    }
};

exports.signInUserServices = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = await createToken({ id: user.id, role: user.role });

        return {
            status: true,
            subCode: 200,
            message: "Login successful",
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            }
        }

    } catch (error) {
        console.error('An error occurred sign-in user services:', error);

        return {
            status: false,
            subCode: 500,
            message: error.message,
            data: {}
        }

    }
}

exports.getUserInfoServices = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        return {
            status: true,
            subCode: 200,
            message: "User Info",
            data: {
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            }
        }

    } catch (error) {
        console.error('An error occurred sign-in user services:', error);

        return {
            status: false,
            subCode: 500,
            message: error.message,
            data: {}
        }

    }
}

exports.userListServices = async (req, res) => {
    try {

        const result = await User.find({}, { _id: 0, id: '$_id', name: 1, email: 1 });

        return {
            status: true,
            subCode: 200,
            message: result ? "All users listed" : " No users listed",
            data: result || result.length > 0 ? result : []
        }

    } catch (error) {
        console.error('An error occurred register user services:', error);

        return {
            status: false,
            subCode: 500,
            message: error.message,
            data: {}
        }

    }
}

exports.editUserServices = async (req, res) => {
    try {
        const { email, name } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return {
                status: false,
                subCode: 404,
                message: message,
                data: {}
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { name, email, phone_number },
            { new: true }
        );

        return {
            status: true,
            message: "User data edit successfully",
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        }

    } catch (error) {
        console.error('An error occurred edit user services:', error);

        return {
            status: false,
            subCode: 500,
            message: error.message,
            data: {}
        }

    }
}