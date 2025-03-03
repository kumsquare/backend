import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization"); // Case-sensitive: "Authorization"

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const token = authHeader.split(" ")[1]; // Extract token
        const verified = jwt.verify(token, "jon"); // Replace "jon" with process.env.JWT_SECRET
        console.log("Verified User:", verified);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default auth;
