
const { verifyToken } = require('../helper/jwtHelper')
const { User } = require('../models')

module.exports = async (req,res,next) => {
  try {
    const access_token = req.headers.access_token
    if(!access_token){
      throw {
        status: 401,
        message: `Login First`}
    }
    else{
      const decoded = verifyToken(access_token)
      let id = decoded.id
      req.loginuser = decoded
      let data = await User.findOne({where: {id: id}})
      // console.log(data)
      if (data) {
        next()
      }
      else {
        throw {
          status: 401,
          message: `Account not found`}
      }
    }
  }
  catch(error){
    console.log(error)
    next(error)
  }
}