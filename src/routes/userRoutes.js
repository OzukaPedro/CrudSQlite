const { Router } = require('express')
const usuarioRouter = Router()
const { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario, listarPorCpf } = require('../controllers/userControllers')

usuarioRouter.get('/', listarUsuarios);
usuarioRouter.post('/', criarUsuario);
usuarioRouter.put('/:id', atualizarUsuario);
usuarioRouter.delete('/:id', deletarUsuario);
usuarioRouter.get('/cpf/:cpf', listarPorCpf);

module.exports = usuarioRouter;