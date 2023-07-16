var express = require('express');

var app = express();

app.use(express.static("."));

app.listen(3000, function(err){
    if (err) {
        console.log("error:", err);
    } else {
        console.log("server on port 3000")
    }
})