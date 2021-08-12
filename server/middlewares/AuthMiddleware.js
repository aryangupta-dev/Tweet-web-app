const verify=require("jsonwebtoken");

function validateToken(req,res,next){
    const accessToken=req.header("accessToken");
    if(!accessToken){
        return res.json({error:"You must be logged in."})
    }
    try{
        const valid=verify(accessToken,"klanaakl");
        if(valid){
            return next();
        }
    }catch(err){
        return res.json({error:err})
    }
}
export default validateToken;