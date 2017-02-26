var path = require('path');
var express = require('express');
var app = express();

var port = 3000;

app.use(express.static('public'));

app.get('/',function(req, res){    
    var file = path.join(__dirname,'views/index.html');
    res.sendFile(file);
});

app.listen(port,function(){
    console.log('listening on port ' + port);
});