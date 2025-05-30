export const showLogin = (req, res) => {
    res.render('auth/login'); 
}

export function authenticate(req, res) {
    const { username, password } = req.body;
    // Perform authentication logic here
    if (!username || !password) {
        res.redirect('/login');
        return;
    }
    if(username.toLowerCase() === 'admin' && password === 'admin') {
        req.session.user= {
            username,
            isAuthenticated: true
        };
        res.redirect('/cars'); // Redirect after successful login
    } else {
        res.redirect('/login');
    }
}

export function checkAuth(req, res, next) {
    let isAuthenticated = req.session.user && req.session.user.isAuthenticated;
    if (isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}


export function logout(req, res) {
    req.session.destroy();
    res.redirect('/');
};
