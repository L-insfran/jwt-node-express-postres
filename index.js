import 'dotenv/config.js';
import express from 'express';

import publicRouter from "./routes/public.route.js";
import userRouter from "./routes/user.route.js";

const app =express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.use('/', publicRouter)
app.use('/api/v1/users', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT ,()=> console.log('servidor prendido en ' + PORT))