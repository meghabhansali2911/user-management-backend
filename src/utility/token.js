const CONSTANT = require("./constant");
const jwt = require("jsonwebtoken");

const createToken = ({ id, role }) => {
    console.log("------ createToken  id, role :------", id, role)
    return jwt.sign(
        { id, role },
        CONSTANT.JWT_SECRET,
        { expiresIn: "1h" }
    );
}

const authMiddleware = (roles) => {
    console.log("------ authMiddleware roles:------", roles)
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("------ return token:------", token)
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Forbidden" });
            if (!roles.includes(user.role)) { return res.status(403).json({ message: "Access Denied" }) };

            req.user = user;
            next();
        });
    };
};

module.exports = {
    createToken,
    authMiddleware,
};