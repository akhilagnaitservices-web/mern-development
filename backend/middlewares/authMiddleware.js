    // Middleware to protect routes — redirects to login if not authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  // For API requests return 401, for page requests redirect
  if (req.headers['content-type'] === 'application/json' || req.path.startsWith('/api/')) {
    return res.status(401).json({ success: false, message: 'Not authenticated.', redirect: '/auth-login.html' });
  }
  return res.redirect('/auth-login.html');
}

// Middleware to restrict to certain roles
function hasRole(...roles) {
  return (req, res, next) => {
    if (req.session && req.session.user && roles.includes(req.session.user.role)) {
      return next();
    }
    return res.status(403).json({ success: false, message: 'Access denied.' });
  };
}

module.exports = { isAuthenticated, hasRole };