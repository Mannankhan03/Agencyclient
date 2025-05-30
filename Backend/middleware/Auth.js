import  jwt from "jsonwebtoken"


const Authadmin = async (req,res,next) =>{
    try {
        const {atoken} = req.headers

        if (!atoken) {
            return res.status(401).json({ success: false, message: "Not Authorized. No token provided." });
          }
          
      
          const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
      
          if (decoded.role !== "admin") {
            return res.status(403).json({ success: false, message: "Forbidden. Admin access only." });
          }
      
          req.admin = decoded; 
          next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ success: false, message: "Session expired. Please login again." });
        } else {
          return res.status(401).json({ success: false, message: "Invalid token. Please login again." });
        }
      }
    };



export default Authadmin