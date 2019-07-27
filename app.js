const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const errorHandlers = require('./middlewares/error-handlers');
const appMiddleware = require('./middlewares/app-middelware')

const app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')

//  middlewares

app.use(session({
    secret:'myappsecret',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 60000}
}))

app.use(express.static(__dirname+'/static'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(appMiddleware.authenticated);
app.use(appMiddleware.logger);
app.use('/', indexRoutes);

app.use('/projects', projectRoutes);

app.use('/admin',appMiddleware.authenticate, adminRoutes);
// app.get('/', routes.index);
// app.get('/projects', routes.project);

// app.get('/signin', routes.signin);
// app.post('/signin', routes.doSignin);
// app.get('/signout', routes.signout);

// app.get('/admin', appMiddleware.authenticate, routes.admin); 
// app.get('/admin/projects', appMiddleware.authenticate, routes.adminProjects);

// app.get('/admin/projects/:alias', appMiddleware.authenticate, routes.adminProjectDetail);


// app.get('/projects/:alias', routes.projectDetail);

app.use(errorHandlers.notFound);


app.use(errorHandlers.handleError);

app.listen(3000, () => console.log('Server up n running on port 3000'))


/*const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const routes = require('./routes/index')
const indexRoutes=require('./routes/index')
const projectRouter = require('./routes/projects')
const errorHandlers = require('./middelwares/error-handlers');
const appMiddleware = require('./middelwares/app-middleware');

const app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')



app.use(session({
    secret:'myappsecret',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 60000}
}))

app.use(express.static(__dirname+'/static'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(appMiddleware.authenticated);
app.use(appMiddleware.logger);


app.use('/', indexRoutes);

app.use('/projects', projectRouter);

app.use('/admin', adminRoutes);
app.get('/', routes.index);
app.get('/projects', routes.project);

app.get('/signin', routes.signin);
app.post('/signin', routes.doSignin);
app.get('/signout', routes.signout);

app.get('/admin', appMiddleware.authenticate, routes.admin);
app.get('/admin/projects', appMiddleware.authenticate, routes.adminProjects)

app.get('/admin/projects/create-new', appMiddleware.authenticate, routes.createProjects)
app.post('/admin/projects/create-new', appMiddleware.authenticate, routes.doCreateProjects)

app.get('/projects/:alias', routes.projectDetail);

app.use(errorHandlers.notFound);


app.use(errorHandlers.handleError);

app.listen(3000, () => console.log('Server up n running on port 3000'))*/