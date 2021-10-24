const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../db/schema/user");

Router.get("/", async (req, res) => {
    const { authorization } = req.headers;

    try {
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        const { email } = decoded;
        const user = await UserModel.findOne({ email });
        const { name, phone_number, address } = user;

        res.status(200).json({ info: { email, name, phone_number, address } });
    } catch (e) {
        res.status(500).send('user not found');
    }
})

Router.post("/", async (req, res) => {
    const { authorization } = req.headers;

    try {

        const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        const decodedEmail = decoded.email;

        const { name, email, phone_number, address } = req.body.userData;

        if (email === decodedEmail) {
            // non email updation
            const user = await UserModel.findOne({ email });

            if (user) {
                const docs = await UserModel.findOneAndUpdate(
                    { email },
                    {
                        email,
                        phone_number,
                        name,
                        address
                    }, {
                    new: true
                }
                );
                const info = {
                    name: docs.name,
                    phone_number: docs.phone_number,
                    address: docs.address,
                    email: docs.email
                }
                const token = jwt.sign({ email }, process.env.SECRET_KEY);
                res.status(200).json({ info: info, 'access-token': token });
            }
        }
        else {
            // email updation
            const user = await UserModel.findOne({ email });
            console.log(user);
            if (user) {
                res.status(500).json({ message: 'Email already taken!' });
            }
            else {
                const docs = await UserModel.findOneAndUpdate(
                    { decodedEmail },
                    {
                        email,
                        phone_number,
                        name,
                        address
                    }, {
                    new: true
                }
                );
                const info = {
                    name: docs.name,
                    phone_number: docs.phone_number,
                    address: docs.address,
                    email: docs.email
                }
                const token = jwt.sign({ email }, process.env.SECRET_KEY);
                res.status(200).json({ info: info, 'access-token': token });
            }
        }


    } catch (e) {
        res.status(500).json({ message: 'Email already taken!' });
    }

})


module.exports = Router;