const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/db'); 

const Client = sequelize.define('Client', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: true, 
        unique: false    
    },
    telefone: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true    
    },
    bonus: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0          
    },
    dataCadastro: { 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'clientes', 
    timestamps: false     
});

module.exports = Client; 