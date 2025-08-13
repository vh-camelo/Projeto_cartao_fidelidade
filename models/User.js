const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../config/db'); 

const User = sequelize.define('User', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: { 
        type: DataTypes.STRING, 
        allowNull: false,       
        unique: true            
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false        
    },
    date: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'Usuarios', 
    timestamps: false   
});

module.exports = User; 