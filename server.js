var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());


// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}



app.post('/listOfAllFlowers', function (req, res) {
  
  const language = req.body.lang;
  res.sendFile(path.resolve(__dirname, `src/server/flowers/flowers${language}.json`));

});

app.post('/siteText', function (req, res) {

  const language = req.body.lang;
  res.sendFile(path.resolve(__dirname, `src/server/siteText/siteText${language}.json`));

});







app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});


app.listen(PORT, function (error) {
  if (error) {
    console.error(error);
  }
  else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
