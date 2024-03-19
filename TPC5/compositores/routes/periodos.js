var express = require('express');
var router = express.Router();
var axios = require('axios')


/* ---------- GET ---------- */

/* Periodos home page */
router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get('http://localhost:3000/periodos')
      .then(resposta => {
        res.render('listaPeriodos', {lista : resposta.data, data: d, titulo: "Lista de períodos"})
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro ao recuperar os períodos"})
      })
  });
  
/* Periodos register */
  router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.render('registoPeriodo', {data: d, titulo: "Registo de período"})
  });

/* Periodos por id */
router.get('/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get('http://localhost:3000/periodos/' + req.params.id)
    .then(resposta => {
      var title = "Consulta do Período " + resposta.data.id;
      res.render('periodo', {periodo: resposta.data, data: d, titulo: title})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar o período"})
    })
});

// GET /periodo/delete/:id --------------------------------------------------------------------
router.get('/delete/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.delete('http://localhost:3000/periodos/' + req.params.id)
      .then(resposta => {
        res.render('periodo', {periodo : resposta.data, data: d, titulo: "Delete de período"})
      })
      .catch(erro => {
        res.render('error', {error: erro, message: "Erro ao recuperar o período"})
      })
  });
  
  


/* ---------- POST ---------- */

/* Periodos register */
router.post('/registo', function(req,res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(JSON.stringify(req.body))
    axios.post('http://localhost:3000/periodos', req.body)
    .then(resposta => {
      res.render('confirmRegisto', {info: req.body, data: d, titulo: "Registo de periodo com Sucesso"})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao gravar um periodo novo"})
    })
  })
  
  module.exports = router;
  