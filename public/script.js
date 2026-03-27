async function carregarProdutos() {
    const response = await fetch('/api/produtos');
    const produtos = await response.json();
    
    const vitrine = document.getElementById('vitrine');
    
    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="alert('Adicionado ao carrinho!')">Comprar</button>
        `;
        vitrine.appendChild(div);
    });
}

carregarProdutos();