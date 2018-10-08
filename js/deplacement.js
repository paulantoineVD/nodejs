var fs = require('fs');
var file = 'test.txt'

let read = fs.createReadStream(file)

fs.stat(file, (err, stat) => {
    let total = stat.size

    let progress = 0

    let write = fs.createWriteStream('copy.txt')


    read.on('data', (chunk) => {
        progress += chunk.length

        console.log("J'ai lu " + Math.round((100*progress / chunk.length)) + "%")
        
    })
    
    
    read.pipe(write)
    
    write.on('finish', () => {
        console.log("Le fichier a bien été copié")
    })
})
