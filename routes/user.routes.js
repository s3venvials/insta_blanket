module.exports = (app, passport) => {

    app.get('/auth/instagram',
        passport.authenticate('instagram'),
        function (req, res) {
            // The request will be redirected to Instagram for authentication, so this
            // function will not be called.
        });

    app.get('/auth/instagram/callback',
        passport.authenticate('instagram', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

}