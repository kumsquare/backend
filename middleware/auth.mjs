import jwt from 'jsonwebtoken';
const auth = (req,res,next) => {
    const token = req.header('authorization')
    if(!token)
        res.status(401).json({message:'no token, authorization denied'})
    try{
        const verified = jwt.verify(token.split(" ")[1],"jon")
        console.log(verified)
        req.user = verified
        if(!roles.includes(req.user.role))
            res.status(401).json({message:'access denied'})
        next()
    }catch(err){
        res.status(401).json({message:'token is not valid'})
    }
}
export default auth;
