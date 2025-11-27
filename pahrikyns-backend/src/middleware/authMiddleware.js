const jwt = require('jsonwebtoken');
function protect(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ message: 'Unauthorized' });
const token = auth.split(' ')[1];
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.admin = decoded;
next();
} catch (err) { res.status(401).json({ message: 'Invalid token' }); }
}
module.exports = { protect };