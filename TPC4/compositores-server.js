var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')
const { parse } = require('querystring');
var static = require('./static.js')             // Colocar na mesma pasta
var templates = require('./templates')          // Necessario criar e colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    var comp_regex = /\/compositores\/C[0-9]{2,3}/
    var per_regex = /\/periodos\//
    
    var del_comp_regex = /\/compositores\/delete\/C[0-9]{2,3}/

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if(req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.composersListPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /compositores/id --------------------------------------------------------------------
                else if(comp_regex.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.composerPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }

                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url == '/compositores/registo')
                {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.composerFormPage(d))
                }

                // GET /periodos --------------------------------------------------------------------
                else if(req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodosListPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /periodos/id --------------------------------------------------------------------
                else if(per_regex.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(resposta.data, d))
                        })
                        .catch(erro => {
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }

                /* 
                // GET /periodos/registo --------------------------------------------------------------------
                else if(req.url == '/peridoos/registo')
                {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.periodoFormPage(d))
                }
                */

                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(req.url, d))
                }
                break
            






            
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                                .then(resposta => {
                                    res.writeHead(200, {'Content-Type': 'text/html'})
                                    res.end(templates.composerPage(resposta.data, d))
                                })
                                .catch(erro => {
                                    res.writeHead(520, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else{
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to colect data from body...</p>")
                            res.end()
                        }
                    })
                }

            
                // POST /alunos/edit/:id --------------------------------------------------------------------

                // POST ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(`Pedido POST não suportado: ${req.url}`, d))
                }
                break

            
            
            case "DELETE":
                // DELETE /compositores/delete/id --------------------------------------------------------------------
                if(del_comp_regex.test(req.url)){
                    console.log("here")
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.delete('http://localhost:3000/instrumentos/I23', result)
                                .then(resp => {
                                    console.log(resp.data);
                            }).
                            catch(error => {
                                console.log(error);
                            });
                            }
                        else{
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to colect data from body...</p>")
                            res.end()
                        }
                    })
                }









                
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

compositoresServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
