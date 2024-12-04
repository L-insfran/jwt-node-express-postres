import {Router} from 'express'
import path from 'path'

const router = Router()

const _dirname =import.meta.dirname

const publicPath = path.join(_dirname, '../public')

router.get('/login',(req, res)=>{
  res.sendFile(publicPath + "/login.html")
})
router.get('/profile',(req, res)=>{
  res.sendFile(publicPath + "/profile.html")
})

export default router