import express from 'express';
import path from 'path';
import migreva from './routes/migreva';

let app = express();

// Template language
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// Static file path
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

migreva(app);

export default app;
