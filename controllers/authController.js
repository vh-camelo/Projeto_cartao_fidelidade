const User = require('../models/User');     
const bcrypt = require('bcryptjs');         
const jwt = require('jsonwebtoken');        
require('dotenv').config();                     


exports.registerUser = async (req, res) => {
    const { username, password } = req.body; 
    
    if (!username || !password) {
        return res.status(400).json({ msg: 'Por favor, insira todos os campos: usuario e senha.' });
    }
    

    try {
        
        let user = await User.findOne({ where: { username } }); 
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

    
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 

        
        user = await User.create({ 
            username,
            password: hashedPassword
        });

        
        const payload = {
            user: {
                id: user.id 
            }
        };

        
        jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
            (err, token) => { 
                if (err) throw err;
                res.json({ token }); 
            }
        );

    } catch (err) {
        console.error(err.message); 
        res.status(500).send('Erro do Servidor'); 
    }
};


exports.loginUser = async (req, res) => {
    const { username, password } = req.body; 

    try {
        
        let user = await User.findOne({ where: { username } }); 
        if (!user) { 
            return res.status(400).json({ msg: 'Credenciais inválidas' }); 
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
            return res.status(400).json({ msg: 'Credenciais inválidas' }); 
        }

        
        const payload = {
            user: {
                id: user.id
            }
        };

        
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro do Servidor');
    }
};