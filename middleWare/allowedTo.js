const appError = require("../utils/appError");

module.exports = (...roles)=>{
 return (req , res , next)=>{
  console.log(roles);
  if (!roles.includes(req.currentUser.role)) {
   return next(appError.create('this role is authrized' , 401))
  }
  
next();
 }
}
