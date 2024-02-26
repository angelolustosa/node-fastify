import { produtos } from "../db/produtos.js"

let produtosBd = produtos

export const produtoService = {
    buscarProdutos: (request, reply) => {
        return produtosBd
    },
    buscarProdutoPorId: (req, res) => {
        let idReq = req.params.id

        let produto = produtosBd.find(p => p.id === parseInt(idReq))
        return produto
    },
    criarProduto: (req, res) => {
        /* let produtoReq = req.body
        produtoReq.id = produtosBd.length + 1 */
        let nextId = produtos.length + 1
        const { nome, preco, off } = req.body;
        const novoProduto = { id: nextId, nome: `Produto ${nextId}`, preco, off };
        return produtosBd.push(novoProduto)
    },
    atualizarProdutoParcial: (req, res) => {
        const id = req.params.id

        let produto = produtosBd.find(p => p.id === parseInt(id));

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
            produtosBd = []
        } catch (error) {
            console.log('ERROR', error);
        }

        return res.status(200).send(produtosBd)
    },
    removerProduto: (req, res) => {
        try {
            const { id } = req.params; // assume que o ID está nos parâmetros da requisição
            // Aqui você precisa implementar a lógica para remover o produto com o ID fornecido
            // Por exemplo, se você tiver um array de produtos chamado "produtos", você pode usar algo assim:
            const index = produtos.findIndex(produto => produto.id === id);
            if (index !== -1) {
                produtos.splice(index, 1);
                return res.status(200).send('Produto removido com sucesso');
            } else {
                return res.status(404).send('Produto não encontrado');
            }
        } catch (error) {
            console.log('ERROR', error);
            return res.status(500).send('Erro ao remover o produto');
        }
    },
}