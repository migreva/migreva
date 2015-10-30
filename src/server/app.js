import express from 'express.io';
import path from 'path';
import migreva from './routes/migreva';

let app = express();

// Template language
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// Static file path
app.use(express.static(path.join(__dirname, '../static')));
app.use(express.static(path.join(__dirname, '../node_modules')));

migreva(app);

if (!config.PROD) {
  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

  });
}
