document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.querySelector(".products-container");
    const cartIcon = document.querySelector(".cart-icon");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartOverlay = document.querySelector(".cart-overlay");
    const closeCartBtn = document.querySelector(".close-cart-btn");
    const cartBody = document.querySelector(".cart-body");
    const cartBadge = document.querySelector(".cart-badge");
    const totalElem = document.getElementById("cart-total");
    const finishOrderBtn = document.getElementById("finish-order-btn");
    const searchInput = document.querySelector(".search-input");
    const categoryBtns = document.querySelectorAll(".category-btn");
    const formContainer = document.getElementById("delivery-form-container");
    const deliveryToggleBtns = document.querySelectorAll(".delivery-btn");
    const productdescription = document.querySelector(".productdescription");
    // Injetar Alerta Customizado
    document.body.insertAdjacentHTML('beforeend', `
        <div id="custom-alert" class="custom-alert">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p style="font-weight:700; color:#0F172A;">Por favor, Escolha um tamanho!</p>
            <button onclick="window.closeAlert()">ENTENDIDO</button>
        </div>
    `);
    window.closeAlert = () => document.getElementById('custom-alert').classList.remove('show');

    const produtos = [
         {
          id: 1, nome: "Vestido em tule poa", categoria: "Vestidos", descricao: "", preco: 179.90,
            imagens: ["./assets3/vestido tule.jpg","./assets3/vestido tule2.jpg","./assets3/vestido tule3.jpg","./assets3/vestido tule4.jpg","./assets3/vestido tule5.jpg"]
         },
    {
            id: 4,  nome: "Blazer em alfaiataria", categoria: "Jaquetas", descricao: "", preco: 349.90,
            imagens: ["./assets3/blazer.jpg", "./assets3/blazer2.jpg"]
        },

  {
            id: 3, nome: "Calça Barrel poa", categoria: "calças", descricao: "", preco: 199.90,
            imagens: ["./assets3/calça barrel1.jpg", "./assets3/calça barrel2.jpg"]
        },
                 {
            id: 2,  nome: "Camiseta oversized", categoria: "Blusas", descricao: "", preco: 189.90,
            imagens: ["./assets3/camiseta oversized.jpg"]
        },
      

    
        {
            id: 25, nome: "Camisa slim alongada", categoria: "Blusas", descricao: "", preco: 139.90,
            imagens: ["./assets3/camisa slim4.jpg","./assets3/camisa slim3.jpg"]
        },

      {
            id: 23, nome: "Conjunto em linho", categoria: "Conjuntos", descricao: "", preco: 199.90,
            imagens: ["./assets3/conjunto linho.jpg", "./assets3/conjunto linho2.jpg", "./assets3/conjunto linho3.jpg"]
        },

   {
            id: 7, nome: "Camisa cropped", categoria: "Blusas", descricao: "", preco: 189.90,
            imagens: ["./assets2/camisa cropped1.jpg", "./assets2/camisa cropped2.jpg", "./assets2/camisa cropped3.jpg", "./assets2/camisa cropped4.jpg","./assets2/camisa cropped5.jpg"]
        },


  
          {
            id: 8, nome: "Conjunto moletom", categoria: "Conjuntos", descricao: "", preco: 299.90,
            imagens: ["./assets/Conjunto.jpg","./assets/Conjunto white.jpg", "./assets/Conjunto white.jpg"]
        },
           {
            id: 9, nome: "Conjunto em alfaiataria", categoria: "Conjuntos", descricao: "", preco: 379.90,
            imagens: ["./assets3/conjunto1.jpg", "./assets3/conjunto3.jpg", "./assets3/conjunto5.jpg", "./assets3/conjunto4.jpg", "./assets3/conjunto2.jpg"]
        },



{
          id: 5, nome: "Macacão canelado", categoria: "Conjuntos", descricao: "", preco: 199.90,
            imagens: ["./assets2/macacão4.jpg","./assets2/macacão5.jpg","./assets2/macacão6.jpg","./assets2/macacão canelado.jpg","./assets2/macacão canelado2.jpg","./assets2/macacão canelado3.jpg"]
         },
        {
          id: 20, nome: "Conjunto Ana", categoria: "Conjuntos", descricao: "", preco: 239.90,
            imagens: ["./assets2/conjunto Ana.jpg","./assets2/conjunto Ana2.jpg","./assets2/conjunto Ana3.jpg","./assets2/conjunto Ana4.jpg"]
         },
    
   {
            id: 6, nome: "Conjunto moletom oversized", categoria: "Conjuntos", descricao: "", preco: 369.90,
            imagens: ["./assets/Conjunto ponche.jpg", "./assets/Conjunto ponche1.jpg"]
        },
{
          id: 18, nome: "Conjunto Havana", categoria: "Conjuntos", descricao: "", preco: 219.90,
            imagens: ["./assets2/conjunto havana.jpg","./assets2/conjunto havana2.jpg","./assets2/conjunto havana3.jpg","./assets2/conjunto havana4.jpg"]
         },


            {
            id: 13, nome: "Blusa gola poliamida", categoria: "Blusas", descricao: "", preco: 109.90,
            imagens: ["./assets2/blusa poliamida1.jpg", "./assets2/blusa poliamida2.jpg"]
        },
     
           {
            id: 15, nome: "Blusa moletom", categoria: "Blusas de frio", descricao: "", preco: 189.90,
            imagens: ["./assets/Blusa moletom1.jpg", "./assets/Conjunto moletom1.jpg"]
        },
 {
            id: 14, nome: "Calça moletom", categoria: "Calças", descricao: "", preco: 210.00,
            imagens: ["./assets/Blusa moletom.jpg", "./assets/Calça moletom1.jpg",]
        },

         
      {
          id: 16, nome: "Bolsa", categoria: "Bolsas", descricao: "", preco: 249.90,
            imagens: ["./assets/Bolsa luz da lua.jpg"]
         },


     
 
 
    ];


    let carrinho = [];
    let filtroCategoria = "all";
    let filtroBusca = "";
    let tipoEntregaAtivo = "delivery";

    const formatarMoeda = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    window.changeImg = (el, src) => {
        const card = el.closest(".product-card");
        const main = card.querySelector(".product-img");
        main.style.opacity = "0";
        setTimeout(() => { main.src = src; main.style.opacity = "1"; }, 200);
        card.querySelectorAll(".thumb-img").forEach(t => t.classList.remove("active"));
        el.classList.add("active");
    };

    window.selectSize = (btn, size) => {
        const parent = btn.parentElement;
        parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected', 'size-error'));
        btn.classList.add('selected');
        parent.dataset.selectedSize = size;
    };

    const animarVoo = (card) => {
        const img = card.querySelector(".product-img");
        const rect = img.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        const clone = img.cloneNode();
        Object.assign(clone.style, {
            position: 'fixed', top: rect.top + 'px', left: rect.left + 'px',
            width: rect.width + 'px', height: rect.height + 'px',
            zIndex: '9999', borderRadius: '15px', pointerEvents: 'none', objectFit: 'cover'
        });
        document.body.appendChild(clone);
        const anim = clone.animate([
            { top: rect.top + 'px', left: rect.left + 'px', width: rect.width + 'px', opacity: 0.8 },
            { top: cartRect.top + 'px', left: cartRect.left + 'px', width: '15px', height: '15px', opacity: 0 }
        ], { duration: 800, easing: 'ease-in-out' });
        anim.onfinish = () => {
            clone.remove();
            cartIcon.classList.add('bump');
            setTimeout(() => cartIcon.classList.remove('bump'), 300);
        };
    };

    const renderProdutos = () => {

        const filtrados = produtos.filter(p => (p.nome + p.categoria + p.descricao)
            .toLowerCase().includes(filtroBusca.toLowerCase()) && (filtroCategoria === "all" || p.categoria === filtroCategoria));
        productsContainer.innerHTML = filtrados.map(p => `

            <div class="product-card" data-id="${p.id}">
         
                <img src="${p.imagens[0]}" class="product-img">
                
                <div class="product-images-nav">${p.imagens.map((img, i) => `<img src="${img}" class="thumb-img 
                ${i === 0 ? 'active' : ''}" onclick="changeImg(this, '${img}')">`).join('')}</div>
                
                <div class="product-info">
            
                    <h3>${p.nome}</h3>

                <p class="product-description">${p.descricao}
                
                    ${p.id === 1 ? "Off white" :
                     p.id === 2 ? "Amarelo manteiga" :
                     p.id === 3 ? "Amarelo manteiga/marrom" :
                     p.id === 4 ? "Azul bebe/Off white" :
                     p.id === 5 ? "Marrom/preto" :
                     p.id === 6 ? "Off white/azul bebe" :
                     p.id === 7 ? "Verde militar/off white" :
                     p.id === 8 ? "Marsala/off white/preto" :
                     p.id === 9 ? "Off white/Rosa bebe" :
                     p.id === 10 ? "Vinho" :
                     p.id === 11 ? "Off white" :
                     p.id === 12 ? "Preto/marrom" :
                     p.id === 13 ? "Azul marinho/marsala":
                     p.id === 14 ? "Preto/azul/verde militar" :
                     p.id === 15 ? "Preto/azul/verde militar" :
                     p.id === 16 ? "Mocaa/preta" : 
                     p.id === 17 ? "Preto/bege" : 
                     p.id === 18 ? "Marsala" : 
                     p.id === 19 ? "Vinho/preto/azul/verde" : 
                     p.id === 20 ? "Azul marinho/marsala" : 
                     p.id === 21 ? "Preto/azul" : 
                    p.id === 22 ? "Azul" : 
                    p.id === 23 ? "Off white/azul bebe" : 
                    p.id === 25 ? "Off white/Marrom/azul bebe" : 
                        p.id === 27 ? "Off white/black" : 
                     ""}

                </p>
               
                   
                 <div class="size-selector" data-selected-size="">


     ${( p.id === 22  ) ?
                `<button class="size-btn" onclick="selectSize(this,'38')">38</button>
                        <button class="size-btn" onclick="selectSize(this, '40')">40</button>
                        <button class="size-btn" onclick="selectSize(this, '42')">42</button><p "
                         class="size-selector" data-selected-size="">
                         </p>${p.descricao}</p>` : ''}
        

                       ${(p.id === 24 || p.id === 8 ||  p.id === 10  ||p.id === 14 || p.id === 15) ?
                `<button class="size-btn" onclick="selectSize(this,'P')">P</button>
                        <button class="size-btn" onclick="selectSize(this, 'M')">M</button>
                        <button class="size-btn" onclick="selectSize(this, 'G')">G</button>
                        <button class="size-btn" onclick="selectSize(this, 'GG')">GG</button><p "
                       ><p>${p.descricao}</p>` : ''}
        
                                ${(p.id === 3   ) ?
                `<button class="size-btn" onclick="selectSize(this,'P')">P</button>
                        <button class="size-btn" onclick="selectSize(this, 'M')">M</button>
                       
                       
                       <p>${p.descricao}</p>` : ''}



                       ${(p.id === 12  || p.id === 4 || p.id === 25   || p.id === 9 ) ?
                `<button class="size-btn" onclick="selectSize(this,'P')">P</button>
                        <button class="size-btn" onclick="selectSize(this, 'M')">M</button>
                        <button class="size-btn" onclick="selectSize(this, 'G')">G</button>
                       
                       <p>${p.descricao}</p>` : ''}


                                   ${(p.id ===19 ) ?
                `<button class="size-btn" onclick="selectSize(this,'M')">M</button>
                        <button class="size-btn" onclick="selectSize(this, 'G')">G</button>
                    
                       
                       <p>${p.descricao}</p>` : ''}

                               ${(p.id ===6 ) ?
                `<button class="size-btn" onclick="selectSize(this,'M')">M</button>
                        <button class="size-btn" onclick="selectSize(this, 'G')">G</button>
                        <button class="size-btn" onclick="selectSize(this, 'GG')">GG</button>
                       
                       <p>${p.descricao}</p>` : ''}

                             ${(p.id ===1 ||p.id ===2  ||p.id ===5 || p.id === 7|| p.id === 11 || p.id === 13|| p.id === 16 || p.id === 17 || p.id === 18 || p.id === 20 || p.id === 21 || p.id === 23 || p.id === 27  ) ?
                `<button class="size-btn" onclick="selectSize(this,'UNICO')">UNICO</button>
                      
                       
                       <p>${p.descricao}</p>` : ''}
                    </div>
                     
                 


                    <p class="product-price">${formatarMoeda(p.preco)}</p>
                    <button class="product-button">Adicionar ao Carrinho</button>
                </div>
            </div>
        `).join("");
    };

    const atualizarCarrinhoUI = () => {
        if (carrinho.length === 0) {
            cartBody.innerHTML = `<div style="text-align:center; padding:50px 20px; color:#94a3b8;"><p>Carrinho vazio</p></div>`;
        } else {
            cartBody.innerHTML = carrinho.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div style="flex:1">
                        <p style="font-weight:800; font-size:0.95rem; color:var(--secondary-color);">${item.nome}</p>
                        <p style="font-size:0.8rem; color:#64748b;">Tam: ${item.tamanho} | ${item.qtd}x</p>
                        <p style="font-weight:700; color:var(--primary-color);">${formatarMoeda(item.preco * item.qtd)}</p>
                    </div>
                    <button onclick="window.removeItem(${index})" class="close-cart-btn" style="width:30px;height:30px;background:none;color:red;">&times;</button>
                </div>`).join("");
        }
        totalElem.innerText = formatarMoeda(carrinho.reduce((acc, i) => acc + (i.preco * i.qtd), 0));
        cartBadge.innerText = carrinho.reduce((acc, i) => acc + i.qtd, 0);
        finishOrderBtn.disabled = carrinho.length === 0;
    };

    window.removeItem = (index) => { carrinho.splice(index, 1); atualizarCarrinhoUI(); };

    productsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("product-button")) {
            const card = e.target.closest(".product-card");
            const tamanho = card.querySelector(".size-selector").dataset.selectedSize;
            if (!tamanho) return document.getElementById('custom-alert').classList.add('show');
            const p = produtos.find(i => i.id === parseInt(card.dataset.id));
            animarVoo(card);
            const noCart = carrinho.find(i => i.id === p.id && i.tamanho === tamanho);
            if (noCart) noCart.qtd++;
            else carrinho.push({ ...p, img: card.querySelector('.product-img').src, qtd: 1, tamanho });
            setTimeout(atualizarCarrinhoUI, 300);
        }
    });

    const atualizarFormulario = (tipo) =>{
        tipoEntregaAtivo = tipo;
        formContainer.innerHTML = tipo === "delivery" ? `
            <div class="form-group"><label>Nome Completo</label><input type="text" id="cust-name"></div>
            <div class="form-group"><label>Endereço</label><textarea id="cust-addr"></textarea></div>` : `
            <div class="form-group"><label>Nome para Retirada</label><input type="text" id="cust-name"></div>`;
    };

    searchInput.oninput = (e) => { filtroBusca = e.target.value; renderProdutos(); };
    deliveryToggleBtns.forEach(btn => btn.onclick = () => {
        deliveryToggleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        atualizarFormulario(btn.dataset.option);
    });
    categoryBtns.forEach(btn => btn.onclick = () => {
        categoryBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filtroCategoria = btn.dataset.category;
        renderProdutos();
    });
    cartIcon.onclick = () => { cartSidebar.classList.add("show"); cartOverlay.classList.add("show"); };
    closeCartBtn.onclick = () => { cartSidebar.classList.remove("show"); cartOverlay.classList.remove("show"); };
    cartOverlay.onclick = () => closeCartBtn.onclick();

    finishOrderBtn.onclick = () => {
        const nome = document.getElementById("cust-name").value;
        if (!nome) return alert("Preencha seu nome!");
        const itensMsg = carrinho.map(i => `- ${i.qtd}x ${i.nome} (${i.tamanho})`).join('\n');
        const msg = `*Tai Modas - NOVO PEDIDO*\nwww.taimodas.com\nCliente: ${nome}\nTotal: ${totalElem.innerText}\nItens:\n${itensMsg}`;
        window.open(`https://wa.me/5515998494383?text=${encodeURIComponent(msg)}`);
    };

    renderProdutos();
    atualizarFormulario("delivery");
});