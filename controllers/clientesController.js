const Client = require('../models/Client');

exports.createClient = async (req, res) => {
    
    const { nome, email, telefone } = req.body;

    
    if (!nome || !telefone) {
        return res.status(400).json({ msg: 'Nome e Telefone são campos obrigatórios para o cadastro do cliente.' });
    }

    try {
    
        let client = await Client.findOne({ where: { telefone: telefone } });
        if (client) {
            return res.status(400).json({ msg: 'Cliente com este telefone já existe no sistema.' });
        }

        
        const newClient = Client.build({
            nome,
            email,      
            telefone,
            pontos: 0   
        });

        
        const savedClient = await newClient.save();
        res.status(201).json({ msg: 'Cliente cadastrado com sucesso!', client: savedClient }); 
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err.message);
        res.status(500).send('Erro do Servidor ao cadastrar cliente.');
    }
};


exports.getAllClients = async (req, res) => {
    try {
        
        const clients = await Client.findAll({ order: [['dataCadastro', 'DESC']] });

        if (clients.length === 0) {
            return res.status(404).json({ msg: 'Nenhum cliente encontrado no sistema.' });
        }

        res.json(clients); 
    } catch (err) {
        console.error('Erro ao obter clientes:', err.message);
        res.status(500).send('Erro do Servidor ao obter clientes.');
    }
};


exports.getClientById = async (req, res) => {
    try {
        
        const client = await Client.findByPk(req.params.id);

        if (!client) {
            
            return res.status(404).json({ msg: 'Cliente não encontrado com o ID fornecido.' });
        }

        res.json(client); 
    } catch (err) {
        console.error('Erro ao obter cliente por ID:', err.message);
        
        res.status(500).send('Erro do Servidor ao obter cliente.');
    }
};


exports.addPoints = async (req, res) => {
    
    const { id } = req.params; 
    const { pontosAdicionar } = req.body; // 

    
    if (typeof pontosAdicionar !== 'number' || pontosAdicionar <= 0) {
        return res.status(400).json({ msg: 'A quantidade de pontos para adicionar deve ser um número positivo.' });
    }

    try {
        
        let client = await Client.findByPk(id);

        if (!client) {
            return res.status(404).json({ msg: 'Cliente não encontrado para adicionar pontos.' });
        }

        
        client.pontos += pontosAdicionar;

        
        await client.save();
        res.json({ msg: 'Pontos adicionados com sucesso!', client: client }); 
    } catch (err) {
        console.error('Erro ao adicionar pontos:', err.message);
        res.status(500).send('Erro do Servidor ao adicionar pontos.');
    }
};


exports.removePoints = async (req, res) => {
    
    const { id } = req.params; 
    const { pontosRemover } = req.body; 

    
    if (typeof pontosRemover !== 'number' || pontosRemover <= 0) {
        return res.status(400).json({ msg: 'A quantidade de pontos para remover deve ser um número positivo.' });
    }

    try {
        
        let client = await Client.findByPk(id);

        if (!client) {
            return res.status(404).json({ msg: 'Cliente não encontrado para remover pontos.' });
        }

        
        if (client.pontos < pontosRemover) {
            return res.status(400).json({ msg: `Não há pontos suficientes. Cliente possui ${client.pontos} pontos.` });
        }

        
        client.pontos -= pontosRemover;

        
        await client.save();
        res.json({ msg: 'Pontos removidos com sucesso!', client: client }); 
    } catch (err) {
        console.error('Erro ao remover pontos:', err.message);
        res.status(500).send('Erro do Servidor ao remover pontos.');
    }
};

    