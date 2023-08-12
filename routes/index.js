var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next){
  res.render('login', { title: 'Express'});
});

router.get('/logout', function (req, res, next){
  req.session.destroy();
  res.redirect('/');
});

router.get('/admin', function (req, res, next){
  if (req.session.user){
    res.render('admin')
  } else {
    const error = { status: '403', stack: 'fail'};
    res.render('error', {error, message: 'Acesso Proibido'});
  }
});

router.post('/autentica', function (req, res, next){
  var {login, senha} = req.body;
  if(login === 'admin' & senha === '123'){
    req.session.user = { login: login };
    res.redirect('/admin');
  } else {
    const error = { status: '401', stack: 'fail' };
    res.render('error', { error, message: 'Acesso não autorizado'});
  }
});

module.exports = router;