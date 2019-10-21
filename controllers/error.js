exports.get404Page = (req, res) => {
    res.status(404).render('404', {
        pageTitle: 'Page not found',
        path: '',
        isAuthenticated: req.session.isLoggedIn
});
};