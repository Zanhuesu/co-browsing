//filename: index.js -- entrypoint
//author: Supernova
//date: 6/10/2022

// configuration
////////////////
const config = require(__dirname+'/../config.json');

// modules
////////////////
const http = require('http')
const fs = require('fs')
var io = require('socket.io');

// HTML
///////////////
var control_html = fs.readFileSync(__dirname+'/../client/control.html', 'UTF-8')
var visit_html = fs.readFileSync(__dirname+'/../client/visit.html', 'UTF-8');

//  replace url_base
control_html = control_html.replace(/<%url_base%>/g, config.url_base);
visit_html = visit_html.replace(/<%url_base%>/g, config.url_base);

// HTTP server
////////////////
webserver = http.createServer(function(req, res){ 
  var body = '';
  if (req.url.indexOf('/control')>-1) {
    body = control_html;
  } else {
    body = visit_html;
  }
  res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
  res.end(body); 
});
webserver.listen(config.port);

// Socket.io
/////////////////
var last_url = config.portada;
io = io.listen(webserver);

io.configure('production', function(){
  io.enable('browser client minify');
  io.enable('browser client etag');
  io.enable('browser client gzip');
  io.set('log level', 1);
});
io.on('connection', function(client){
  var ip = client.handshake.address.address;
  console.info(new Date().toString()+' Connected '+ip);
  client.emit('jump', last_url);
  client.on('jump', function(url){
    if (last_url != url) {
      last_url = url;
      console.log(new Date().toString()+' @'+ip+' → '+url);
      io.sockets.emit('jump',url);
    }
  });
});
