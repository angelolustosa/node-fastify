import { produtoService } from "../services/produtos.service.js";

export default function configureRoutes(fastify) {
    fastify.get('/produtos', produtoService.buscarProdutos);
    fastify.get('/produto/:id', produtoService.buscarProdutoPorId);
    fastify.post('/produto', produtoService.criarProduto);
    fastify.put('/produto/:id', produtoService.atualizarProduto);
    fastify.patch('/produto/:id', produtoService.atualizarProdutoParcial);
    fastify.delete('/produtos', produtoService.removerTodosProduto);
    fastify.delete('/produto/:id', produtoService.removerProduto);
}