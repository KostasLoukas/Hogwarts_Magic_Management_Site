import express from 'express';
import fs from 'node:fs';
import hogwartsRouter from './routes/hogwartsRoutes.js';
import mongoose from 'mongoose';
import MagicItem from './mongooseSchema.js';
//mongoose.set('debug', true);


const app = express();

//Built-in middleware: parses JSON body into req.body
app.use(express.json());


//Middleware to share data with controllers
app.use((req, res, next) => {
  next();
});

//Error Handling for Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


//Mount router
app.use('/api/v1/magicItems', hogwartsRouter);

export default app;
