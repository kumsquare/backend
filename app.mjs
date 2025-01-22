import express from 'express'
import connectDB from './config/db.mjs'
import itemRoutes from './routes/itemRoutes.mjs'
import userRoutes from './routes/userRoutes.mjs'
const app = express();
app.use(express.json())
connectDB()
app.use('/api/items',itemRoutes)
app.use('/api/users',userRoutes)
app.listen(3000 , ()=>{
    console.log(`server running at port 3000`)
});
