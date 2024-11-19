import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { apiRoutes , redirectRouter } from './routes/api.js';
import { UrlModel } from './models/urlModel.js';
const port = process.env.PORT || 3000;

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'view')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'view/index.html'));
});

app.use('/api', apiRoutes);
app.use('/', redirectRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
