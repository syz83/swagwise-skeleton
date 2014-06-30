/* ================= REQUIRE MODULES ===================== */

var express      = require('express'),
    app          = express(),
    path         = require('path'),
    fs           = require('fs'),
    logger       = require('morgan');

/* ===================== CONFIGURATION ==================== */

var port = process.env.PORT || 9001;					                // Default port or port 9001

/* ================= REGISTER MODULES ===================== */

app.use(logger('dev'));                                 		        // log every request to the console
app.use(express.static(path.join(__dirname, 'app')));		            // set the static files location

/* ======================== ROUTES ========================= */

require('./routes.js')(app);                            		        // configure our routes, passing in app reference

/* =============== START APP (THIS GOES LAST) ============== */

app.listen(port);                                                       // startup our app at http://localhost:9001
console.log('The MEAN app is served up at http://localhost:' + port);   // shoutout to the user
exports = module.exports = app;                                         // expose app
