import express, { Application } from "express";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import authRoute from './routes/auth.route'
import collegeRoute from './routes/college.route'
import departmentRoute from './routes/department.route'
import officeRoute from './routes/office.route'
import visitorRoute from './routes/visitor.route'
import visitorRecordRoute from './routes/visitorRecord.route'
import transactionRoute from './routes/transaction.route'


const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan logging in development only
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/college',)
// Handle undefined routes
app.all(/(.*)/, globalErrorHandler);

// Global error handler
app.use(globalErrorHandler);

export default app;
