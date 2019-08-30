
var app = function(){
    var http = require('http');
    var webserver;

    const server = http.createServer(function(request, response) {
        console.dir(request.param)

        if (request.method == 'POST') {
          console.log('POST')
          var body = ''
          request.on('data', function(data) {
            body += data

            try{
                var json = JSON.parse(data);
                webserver.addPayload(data);
                spreadsheet.addPayload(data);
            }catch(error){
                console.log(error);
            }
          });
          request.on('end', function() {
            console.log('Body: ' + body)
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end('post received')
          })
        } 
      })
      
      webserver = require('./webserver.js').app(server);
      const port = process.env.PORT || 8081
      server.listen(port)
      
      console.log(`Listening at http://${port}`);
}
app();

  
