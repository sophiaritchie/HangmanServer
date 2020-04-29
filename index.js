var express = require("express");
var app = express();
app.use(express.json());

 app.get('/ping', (req, res) => {
     res.send('ping');
     });

app.listen(3000);
