// Express
const express = require('express');
const app = express();
const port = process.env.PORT;
const methodOverride = require('method-override');
const cors    = require('cors')

//Rutas

const tareasRoutes       = require('./Routes/tareas/tareasRoutes');

app.use(express.static('public'));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs');
// Middlewares nivel APP
app.use(methodOverride('_method'));

// Routes
//app.use('/', mainRoutes) ;
app.use('/tareas', tareasRoutes) ;

//app.use((req,res,next)=>{res.status(404).render('not-found')});

// Server
let puerto = port || 8001

app.listen(puerto, () => {
    console.log('dashapp backend activo en puerto: '+puerto );
});