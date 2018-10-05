var http = require('http');
var url = require('url');
var fs = require('fs');


var server = http.createServer();

server.on('request', (request, response) => {

    urlInfo = url.parse(request.url, true);

    //Check if the web page exist
    fs.readFile("." + urlInfo.pathname, 'utf-8', (err, data) => {

        if(err) 
        {
            //Print the error or 404 web page
            fs.readFile("404.html", 'utf-8', (err, data) => {
                
                if(err)
                {
                    response.writeHead(404, {"Content-Type": "text/html; Charset=Utf-8"})
                    response.end("Cette page n'existe pas...");
                }
                else
                {
                    response.writeHead(404, {"Content-Type": "text/html; Charset=Utf-8"})
                    response.end(data);
                }
            })
        }
        else
        {
            response.writeHead(200, {"Content-Type": "text/html; Charset=Utf-8"});
            response.end(data)
        }
    })
})

server.listen(8080);