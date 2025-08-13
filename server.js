const express = require('express');
const cors = require('cors'); 
require('dotenv').config();

const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');

const app = express();


connectDB();

app.use(express.json());
app.use(cors()); 

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);

app.get('/', (req, res) => {
    res.send('API de Cartão Fidelidade funcionando!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT} (http://localhost:${PORT})`));