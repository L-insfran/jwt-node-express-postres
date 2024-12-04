import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'

const register = async(req, res)=>{
  try {
  
    const { username, email, password} = req.body

    if(!username || !email || !password){
      return res.status(400).json({ok:false, msg:"Missing required fields: mail, password, username"})
    }

    const user = await UserModel.findOneByEmail(email)
    if(user){
      return res.status(409).json({ok: false, msg:"Email already exists"})
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await UserModel.create({email, password:hashedPassword, username})

    const token = jwt.sign({
      email: newUser.email
    },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )



    return res.status(201).json({ok:true, token:token})
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok:false,
      msg:"Error server"
    })
  }
}

const login = async(req, res)=>{

  try {
    const { email, password} = req.body
  
    if(!email || !password){
      return res.status(400).json({
        ok:false,
        error:"Missing required fields: email, password"
      })
    }

    const user = await UserModel.findOneByEmail(email)

    if(!user){
      return res.status(404).json({error:"User no found"})
    }

    const isMatch = await bcryptjs.compare(password, user.password)
    
    if(!isMatch){
      return res.status(401).json({error:"Invalid Credentials"})
    }
    
    const token = jwt.sign({
      email: user.email
    },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )

    return res.status(200).json({ok:true, token:token})
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok:false,
      msg:"Error server"
    })
  }
}

const profile = async(req, res)=>{
  try {
    const user = await UserModel.findOneByEmail(req.email)
    return res.json({ok: true, msg: user })
  } catch (error) {
     console.log(error)
    return res.status(500).json({
      ok:false,
      msg:"Error server"
    })
  }
}

export const UserController ={
  register,
  login,
  profile
}