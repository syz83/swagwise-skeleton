module.exports = function(app) {

    /* ========================= FRONT-END ROUTES ======================= */
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load our public/index.html file
    });

};