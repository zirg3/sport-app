import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path';



/* config */
import {connectDB} from './config/db.js';

/* middleware */
import {errorHandler, notFound} from './middleware/errorMiddleware.js';

/* routes*/
import userRoutes from './routes/userRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development')
  app.use(morgan('dev'))

app.use(express.json())

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

// app.get("/uploads", (req, res) => {
//   res.sendFile(path.join(__dirname, "/uploads/exercises/back.svg"));
// });

app.use('/api/users', userRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/workouts', workoutRoutes)

app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server run in ${process.env.NODE_ENV} on port ${PORT}`.blue.bold
    )
)