const http = require('http');

const server = http.createServer((req, res) => {
  // This function runs every time a request arrives
  if(req.method == "GET" && req.url == "/status"){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let data = { status : "online"}
    res.end(JSON.stringify(data))
  }
  else{
    res.writeHead(404, {'Content-Type' : "application/json"});
    res.end()
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});