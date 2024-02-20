import { produtos } from "../db/produtos.js"

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
        const id = req.params.id

        let produto = produtos.find(p => p.id === parseInt(id));

        // !produto -> se não existir 
        if (!produto) { //undefined, null, 0
            res.status(404).send(
                { message: 'Produto não encontrado' }
            )
            // o return interrompe, caso não haja produto
            return;
        }

        //atualiza cada propriedade do produto do array com o produto do body
        produto.nome = req.body.nome ?? produto.nome 
        produto.preco = req.body.preco ?? produto.preco 
        produto.off = req.body.off ?? produto.off 

        res.status(201).send(produto)

    },
    atualizarProduto: (req, res) => {
        console.log('Ei Dev faz o PUT em casa ou onde quiser, não interessa, eu quero feito!');
    },
    removerTodosProduto: (req, res) => {
        try {
            produtos = []
        } catch (error) {
            console.log('ERROR', error); 
        }

        return res.status(304)
    },
    removerProduto: (req, res) => {
        
    },
}