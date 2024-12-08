import Hello from './hello.js'
import express from 'express'
import Lab5 from './Lab5/index.js'
import UserRoutes from './Kanbas/Users/routes.js'
import cors from "cors";
import session from "express-session";
import mongoose from 'mongoose';
import "dotenv/config";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';

const app = express();

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);


app.use(
    cors({
      credentials: true,
      origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
  
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentsRoutes(app);
AssignmentRoutes(app);

app.listen(process.env.PORT || 4000, () => console.log("hello, server started"));