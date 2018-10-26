var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');



var server = http.createServer();

server.on('request', (request, response) => {

    urlInfo = url.parse(request.url, true);
    console.log(urlInfo);

    //Transfer d'un fichier
    if (urlInfo.query.fichier != undefined) {
        deplacerFichier(urlInfo.query.fichier)
    }

    //Check if the web page exist
    fs.readFile("." + urlInfo.pathname, 'utf-8', (err, data) => {

        if (err) {
            //Print the error or 404 web page
            fs.readFile("src/404.html", 'utf-8', (err, data) => {

                if (err) {
                    response.writeHead(404, { "Content-Type": "text/html; Charset=Utf-8" })
                    response.end("Cette page n'existe pas...");
                }
                else {
                    response.writeHead(404, { "Content-Type": "text/html; Charset=Utf-8" })
                    response.end(data);
                }
            })
        }
        else {
            response.writeHead(200, { "Content-Type": "text/html; Charset=Utf-8" });
            response.end(data)
        }
    })
})

//Deplacer un fichier

function deplacerFichier(file) {

    let read = fs.createReadStream(file)

    fs.stat(file, (err, stat) => {
        let total = stat.size

        let progress = 0

        let write = fs.createWriteStream('copy.txt')


        read.on('data', (chunk) => {
            progress += chunk.length
            console.log(Math.round((progress*100) / total) + "%")

        })

        read.pipe(write)

        write.on('finish', () => {
            console.log("Le fichier a bien été copié")
        })
    })
}

server.listen(8080);