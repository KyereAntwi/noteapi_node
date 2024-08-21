import express, { json } from 'express';
const app = express();
import { connectToDB } from './src/services/initializeDatabase';
import notesroutes from './src/routes/notes';

connectToDB();
app.use(json());

//routes
app.use('/api/v1/notes', notesroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App is listening ', PORT));
