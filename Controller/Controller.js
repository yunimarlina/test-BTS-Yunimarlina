const {User,Shopping} = require('../models/index.js')
const {generateToken} = require('../helper/jwtHelper')

class Controller{
  static async register (req,res,next){
    const { username,email, password, phone, country,city,postcode,name,address} = req.body
    User.create({username,email, password, phone, country,city,postcode,name,address})
      .then (data=>{
        const access_token = generateToken({id: data.id,email: data.email})
        res.status(200).json({ email: data.email, access_token, username: data.username })


      })
      .catch (err=>{
        res.status(400).json({message:error.message})
      })
  }

  static login(req,res,next){
    const email = req.body.email
    const password = req.body.password
    if (!password) next({status: 404, message: 'Please input your Password'})
    if (!email) next({status: 404, message: 'Please input your Email' })
    User.findOne({where:{email:email}})
      .then(data=>{
        if(!data){
          res.status(401).json, ({message: `Account Not Found` })
        }
        else if (password === data.password ){
          const access_token = generateToken({id: data.id,email: data.email})
          res.status(200).json({ email: data.email, access_token, username: data.username })
        }
      })
      .catch (err=>{
        next(err)
      })
  }
  static async showAllUser(req,res){
    try{
      let data = await User.findAll()
      console.log(data)
      res.status(200).json(data)

    }
    catch(error){
      console.log(error)
      res.status(400).json(error)
    }
  }
  static createShopping(req,res){
    const newShop = {
      name: req.body.shopping.name,
      creadtedDate: req.body.shopping.createdDate
    }
    Shopping.create(newShop, {returning: true})
      .then((data) => {
        res.status(200).json({data:{name: data.name, id:data.id, created: data.creadtedDate}})
      })
      .catch (error=>{
        console.log(error)
          res.status(400).json({error})
    })

    // try{
    //   let shopping = Shopping.create(newShop,{returning: true})
    //   console.log(shopping)
    //   res.status(200).json({data:{name: shopping.name, id:shopping.id, created: shopping.creadtedDate}})

    // }
    // catch(error){
    //   console.log(error)
    //   res.status(400).json(error)
    // }
  }

  static async showAllShoping(req,res){
    try{
      let data = await Shopping.findAll()
      console.log(data)
      res.status(200).json(data)

    }
    catch(error){
      console.log(error)
      res.status(400).json(error)
    }
  }
  static async showDetailShoping(req,res){
    try{
      let data = await Shopping.findOne({where:{id:req.params.id}})
      console.log(data)
      res.status(200).json(data)

    }
    catch(error){
      console.log(error)
      res.status(400).json(error)
    }
  }

  static updateShop(req,res,next){
    const editShop = {
      name: req.body.shopping.name,
      creadtedDate: req.body.shopping.createdDate
    }
    Shopping.update(editShop, {where: {id: req.params.id},returning: true})
      .then(() => {
          res.status(200).json({message: 'Your Shop Updated'})
      })
      .catch (error=>{
          res.status(400).json({error})

    })
  }

  static async delete(req,res){
    const id = +req.params.id
    try {
      let data = await Shopping.destroy({
          where: {id},returning: true
      })
      if(!data){
        res.status(400).json({message: 'Data not found'})
      } else{
        res.status(200).json({message:`Success Deleted`})
      }
    } 
    catch (error) {
      res.status(400).json(error)
    }
  }


}

module.exports = Controller