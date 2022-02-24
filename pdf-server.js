const https = require('https');
const fs = require('fs');
const { request } = require('http');

//custom logger
var util = require('util');
var logFile = fs.createWriteStream('log.txt', { flags: 'w' });
  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
    // Storing without color codes
    logFile.write(util.format.apply(null,arguments).replace(/\033\[[0-9;]*m/g,"") + '\n');
    // Display normally, with colors to Stdout
    logStdout.write(util.format.apply(null, arguments) + '\n');
}

//path  zonder / want fileName is al met /
var path = '/Users/emileplas/Desktop/testdownloadfolder'

const hostname = '127.0.0.1';
const port = 4567;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  json: true
};

const server = https.createServer(options, function (req, res) {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');

    if(req.method === 'GET'){
        var fileName = req.url
        // res.setHeader('Content-Type', 'text/plain');
        // res.end(fileName);

       

        

        fs.readFile(path + fileName, (error,data) =>{
            if(error){
                console.log(error)
                res.writeHead(400, {"Content-Type": "application/json"});
                res.write(JSON.stringify(error));
                res.end();
                
            }else{
                res.writeHead(200, {"Content-Type": "application/pdf"});
                res.write(data);
                res.end();
            }
        })
    }else{
        // var otherMethodError = new Error('Method is not allowed', {cause: 'Method is not allowed'});
        console.log("Not allowed method" + req);
        res.writeHead(403, {"Content-Type": "test/plain"});
        res.write('Method not allowed');
        res.end();
    }
}
)


server.listen(port,hostname, () =>{
    console.log(`Server is running at https://${hostname}:${port}/`)
});

