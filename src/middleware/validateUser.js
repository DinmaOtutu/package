const validateUser = (req, res, next) => {
    const { hostUserId } = req.query;
    if (!hostUserId) {
        return res.status(400).json({ error: 'hostUserId is required' });
    }
    next();
};

module.exports = validateUser;
