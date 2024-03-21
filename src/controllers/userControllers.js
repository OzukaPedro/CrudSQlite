const usuarios = require('../models/userModel');
const { validarCPF } = require('../utils/validarCpf');

const buscarCpf = async (cpf) => {
    const usuario = await usuarios.findOne({where: {CPF: cpf}});
    return !!usuario;
};

const listarUsuarios = async (req, res) => {
    try{
        const usuario = await usuarios.findAll()
        res.status(200).json({usuarios: usuario});
    }catch(err){
        res.status(500).send(err);
    }
}

const criarUsuario = async (req, res) =>{
    try{
        const data = {...req.body}
        data.DataDeNascimento = new Date(data.DataDeNascimento)
        data.Cpf = data.Cpf.replace(/[^\d]/g, '')
        cpf = data.Cpf
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: 'CPF inválido' })
        }
        if (await buscarCpf(cpf)) {
            return res.status(400).json({ error: 'CPF já cadastrado' });
        }
        const usuario = await usuarios.create({ ...data })
        res.send({ ...usuario })
    }catch(err){
        res.status(500).send(err);
    }
}

const atualizarUsuario = async (req, res) => {
    try{
        const { id } = req.params
        const data = { ...req.body }
        data.DataDeNascimento = new Date(data.DataDeNascimento)
        data.Cpf = data.Cpf.replace(/[^\d]/g, '')
        cpf = data.Cpf
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: 'CPF inválido' })
        }
        const usuario = await usuarios.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario não encontrado' })
        }
        await usuario.update(data)
        res.status(204).send()
    }catch(err){
        res.status(500).send(err);
    }
}

const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await usuarios.findByPk(id)
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario não encontrado' })
        }
        await usuario.destroy()
        res.status(204).send()
    } catch (err) {
        return res.status(500).send(err)
    }
}

const listarPorCpf = async (req, res) => {
    try {
        const { cpf } = req.params
        if (!validarCPF(cpf)) {
            return res.status(400).json({ error: 'CPF inválido' })
        }
        const usuario = await usuarios.findOne({ where: { Cpf: cpf } })
        if (!usuario) {
            return res.status(404).json({ error: 'CPF não encontrado' });
        }
        return res.json(usuario.dataValues)
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario, listarPorCpf };