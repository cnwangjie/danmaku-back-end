let app = require('express')()
var bodyParser = require('body-parser');
let cookieParser = require('cookie-parser')
let server = require('http').createServer(app)
let io = require('socket.io')(server)
let db = require('mongoose').connect('mongodb://127.0.0.1:27017/test')
let rds = require('redis').createClient(6379, '127.0.0.1', {})
let exphbs = require('express-handlebars')
let async = require('async')
let hbs = exphbs.create({
    defaultLayout: 'main',

    // handlebars helpers
    helpers: {
        date: function(timestamp) {
            return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
        }
    }
})

io.on('connection', require('./connection.js'))

server.listen(3000) // socket port

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.use(require('./auth.js'))

app.get('/', (req, res) => {
    if (req.auth) {
        res.redirect('./home')
    } else {
        res.render('rl', {
            msg: false
        })
    }
})

app.post('/rl', require('./routes/rl.js'))

app.get('/home', require('./routes/home.js'))

app.use('/site', require('./routes/site.js'))

app.listen(8080) // site port
