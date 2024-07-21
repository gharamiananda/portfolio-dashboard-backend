/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import cors, { CorsOptions } from 'cors';

const app: Application = express();

//parsers
app.use(express.json());


type OriginCheckFunction = (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => void;

// Define the CORS options type
interface CustomCorsOptions extends CorsOptions {
  origin: OriginCheckFunction;
}
type Whitelist = string[];


// Define the whitelist
const whitelist: Whitelist = [
  'http://localhost:3333',
  'http://localhost:3000',
  'http://localhost:3334',
  'http://localhost:3001',
  'http://knighthunt-website-admin.s3-website.ap-south-1.amazonaws.com',
  'http://knighthunt-website.s3-website.ap-south-1.amazonaws.com',
  'http://knighthunt-admin.techwens.in',
  'http://knighthunt.techwens.in'
];

// Define the CORS options
const corsOptions: CustomCorsOptions = {
  origin(origin, callback) {
    if (true) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Use the CORS middleware with custom options
app.use(cors(corsOptions));
// app.use(cors({ credentials: true }));


// application routes

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Flower Api store");
});

app.use("/api", router);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
