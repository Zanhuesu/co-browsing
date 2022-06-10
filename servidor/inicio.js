// Configuración
////////////////
var config = require(__dirname+'/../config.json');

// Módulos
////////////////
var http = require('http')
  , fs = require('fs')
  , io = require('socket.io');

// HTML
///////////////
var control_html = fs.readFileSync(__dirname+'/../cliente/control.html', 'UTF-8')
  , visor_html = fs.readFileSync(__dirname+'/../cliente/visor.html', 'UTF-8');
//  Reemplazamos la url_base
control_html = control_html.replace(/<%url_base%>/g, config.url_base);
visor_html = visor_html.replace(/<%url_base%>/g, config.url_base);

// Servidor HTTP
////////////////
webserver = http.createServer(function(req, res){ 
  var cuerpo = '';
  if (req.url.indexOf('/control')>-1) {
    cuerpo = control_html;
  } else {
    cuerpo = visor_html;
  }
  res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
  res.end(cuerpo); 
});
webserver.listen(config.puerto);

// Socket.io
/////////////////
var ultima_url = config.portada;
io = io.listen(webserver);
//   Optimizaciones para producción: https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
//   NODE_ENV=produccion node inicio.js
io.configure('produccion', function(){
  io.enable('browser client minification');
  io.enable('browser client etag');
  io.enable('browser client gzip');
  io.set('log level', 1);
});
io.on('connection', function(cliente){
  var ip = cliente.handshake.address.address;
  console.info(new Date().toString()+' Conectado '+ip); 
  cliente.emit('salto', ultima_url);
  cliente.on('salto', function(url){
    if (ultima_url != url) {
      ultima_url = url;
      console.log(new Date().toString()+' @'+ip+' → '+url);
      io.sockets.emit('salto',url);
    }
  });
});
