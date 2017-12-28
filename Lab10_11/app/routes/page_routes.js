var ObjectID = require('mongodb').ObjectID;
var _dirname = 'D:/Web_labs/Lab10_11';
module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.sendFile(_dirname + '/index.html');
  });
  app.get('/Admin.html', (req, res) => {
    res.sendFile(_dirname + '/Admin.html');
  });
  app.get('/Feedbacks.html', (req, res) => {
    res.sendFile(_dirname + '/Feedbacks.html');
  });
  app.get('/index.html', (req, res) => {
    res.sendFile(_dirname + '/index.html');
  });
  app.get('/News.html', (req, res) => {
    res.sendFile(_dirname + '/News.html');
  });
  app.get('/Curriculum.html', (req, res) => {
    res.sendFile(_dirname + '/Curriculum.html');
  });
};
