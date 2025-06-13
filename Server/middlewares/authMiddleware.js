import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
    const token = req.query.token ? JSON.parse(req.query.token) : req.headers.authorization.split(" ")[1];
    
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized user!"
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedUser.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Unauthorized user!"
        });
    }
}

export { authMiddleware }