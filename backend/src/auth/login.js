const jwt = require('jsonwebtoken');


module.exports = (req, res) => {
    const { email, password } = req.body;

    const user = Users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        const accessToken = jwt.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            accessToken
        });
    } else {
        res.send('Email or password incorrect.');
    }

};
