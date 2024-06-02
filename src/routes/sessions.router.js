import { Router } from 'express';
import usersModel from '../models/users.model.js'
import { createHash, isValidPassword } from '../config/bcrypt.js'

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = new usersModel({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        });
        await newUser.save();
        console.log({ status: "success", message: "User registered" });
        res.status(200).redirect('/api/users/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    } 
});

router.get('/failregister', async (req, res) => {
    console.log("Failed Strategy")
    res.send({ error: "Failed" })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersModel.findOne({ email });
        if (!user) return res.status(404).send('Usuario no encontrado');
        if (!isValidPassword(user, password)) return res.status(403).send({ status: "error", error: "Password incorrecto" })
        delete user.password
        req.session.user = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            rol: user.rol,
        };
        if(req.session.user.rol === "user"){
            res.status(200).redirect('/api/products/');
        } else {
            res.status(200).redirect('/api/admin/realtimeproducts');
        }
        
    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.get('/faillogin', (req, res) => {
    res.send({ error: "Falied login" })
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/api/users/login');
    });
});

export default router;
