const express = require('express');
const bodyParser = require('body-parser');
const spawn = require('child_process').spawn;
app = express()
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('index', {
        stdout: "", 
        code: "",
        stdin: ""
    })
})
app.post('/', (req, res) => {
    var process;
    if (req.body.language == 'python3') {
        process = spawn("python", ["./main.py", req.body.code, req.body.stdin, __dirname]);
    }else{
        res.send("Choose a valid language")
    }
    process.stdout.on('data', (data) => {
        res.render("index", {
            stdout: data.toString(),
            code: req.body.code,
            stdin: req.body.stdin
        })
    });
})
app.listen(process.env.PORT || 3000)