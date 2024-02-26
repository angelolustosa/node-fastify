import { produtos } from "../db/produtos.js"

/* Ao importar o módulo produto ele se comportar como readOnly, ou seja, apenas leitura e no método removerTodosProduto() na linha 47 ao tentar setar produtos como vazio, pegamos o erro que não podemos setar em uma constante. Para realizarmos o remover desta forma, devemos declarar a variável dentro do escopo do arquivo como na linha 4 e não usar mais o import*/
//let produtos = []

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
        produtos.splice(0)
        //produtos = []
        return res.status(200).send(produtos) 
    },
    removerProdutoPorId: (req, res) => {
        const id = req.params.id

        const produtoIndex = produtos.findIndex(p => p.id === parseInt(id))

        if(produtoIndex !== -1 ) {
            //Se for diferente de -1 é pq achou o produto
            let produtoEncontrado = produtos.splice(produtoIndex, 1)
            return res.status(201).send(produtoEncontrado)
        } else {
            return res.status(404).send('Produto não encontrado!')
        }




    },
}