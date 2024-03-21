const { DataTypes } = require("sequelize");
const db = require("../config/database");

module.exports = db.define('Usuario', {
    Nome: {
        type:DataTypes.STRING,
        allowNull:false
    },
    Email: {
        type:DataTypes.STRING,
        allowNull:false
    },
    Telefone: {
        type:DataTypes.STRING,
        allowNull:false
    },
    DataDeNascimento: {
        type:DataTypes.DATE,
        allowNull:false
    },
    Cpf: {
        type:DataTypes.STRING,
        allowNull:false
    },
    Status: {
        type:DataTypes.ENUM,
        values: ["Ativo", "Inativo"],
        allowNull:false,
        defaultValue: "Ativo"
    }
});