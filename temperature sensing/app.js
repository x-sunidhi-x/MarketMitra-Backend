var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
// var SerialPort = require('serialport');
const { SerialPort } = require('serialport')
var port = new SerialPort({ path: 'COM9', baudRate: 9600 });

var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
});

var io = require('socket.io')(app);

io.on('connect', function (socket) {
    console.log('Node is listening to port');
});

port.on('data', function (data) {
    console.log('Received data from port: ' + data.toString()); // Convert data to string if necessary
    io.emit('data', data); // Emit data to socket clients
});

app.listen(3000);
