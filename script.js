var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');

const {SerialPort} = require('serialport');
const {ReadlineParser}=require('@serialport/parser-readline')
const parsers = SerialPort.parsers;



var port = new SerialPort('COM4',{ 
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

const parser=port.pipe(new ReadlineParser({delimiter:'\r\n'}));

parser.on('data',(data)=>{
    document.querySelector('#data').innerHTML=data
})