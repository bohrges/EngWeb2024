var express = require('express');
var router = express.Router();
var axios = require('axios')

/* ---------- GET ----------*/

/* Compositores home page */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores')
    .then(resposta => {
      res.render('listaCompositores', {lista : resposta.data, data: d, titulo: "Lista de compositores"})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar os compositores"})
    })
});

/* Compositores register */
router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoCompositor', {data: d, titulo: "Registo de compositor"})
});

/* Compositores por id */
router.get('/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
  .then(resposta => {
    res.render('compositor', {compositor : resposta.data, data: d, titulo: "Consulta de compositor"})
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao recuperar o compositor"})
  })
});

// GET /composer/delete/:id --------------------------------------------------------------------
router.get('/delete/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/compositores/' + req.params.id)
    .then(resposta => {
      res.render('compositor', {compositor : resposta.data, data: d, titulo: "Delete de compositor"})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar o compositor"})
    })
});

/* ---------- POST ----------*/

/* Compositores register */
router.post('/registo', function(req,res){
  var d = new Date().toISOString().substring(0, 16)
  console.log(JSON.stringify(req.body))
  axios.post('http://localhost:3000/compositores', req.body)
  .then(resposta => {
    res.render('confirmRegisto', {info: req.body, data: d, titulo: "Registo de compositor com Sucesso"})
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao gravar um compositor novo"})
  })
})

module.exports = router;