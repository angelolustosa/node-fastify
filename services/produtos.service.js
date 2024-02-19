import { produtos } from "../db/produtos.js"

let objResponse ={
    message: '',
    data: []
}

export const produtoService = {
    buscarProdutos: (request, reply) => {
        return produtos
    },
    buscarProdutoPorId: (req, res) => {
        let idReq = req.params.id

        let produto = produtos.find(p => p.id === parseInt(idReq))
        return produto
    },
    criarProduto: (req, res) => {
        let produtoReq = req.body
        return produtos.push(produtoReq)
    },
    atualizarProdutoParcial: (req, res) => {
        const id = req.params.id;

        let produto = produtos.find(p => p.id === parseInt(id));

        // !produto -> se não existir 
        if (!produto) { //undefined, null, 0
            res.status(404).send(
                { message: 'Produto não encontrado' }
            )
            // o return interrompe, caso não haja produto
            return;
        }

        


    },
    atualizarProduto: (req, res) => {

    },
    removerProduto: (req, res) => {

    },
}