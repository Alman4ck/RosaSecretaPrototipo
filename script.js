const products=[
{id:1,name:"Conjunto de Renda",price:129.90,image:"renda.png",category:"Lingerie"},
{id:2,name:"Vibrador Rabbit",price:299.90,image:"rabbit.png",category:"Bem-estar"},
{id:3,name:"Gel Lubrificante 50ml",price:39.90,image:"gel.png",category:"Bem-estar"},
{id:4,name:"Body Sensual",price:149.90,image:"body.png",category:"Lingerie"},
{id:5,name:"Algemas de Metal",price:79.90,image:"algemas.png",category:"Acessórios"},
{id:6,name:"Conjunto com Strass",price:179.90,image:"strass.png",category:"Lingerie"},
{id:7,name:"Conjunto Fio Dental",price:119.90,image:"fio_dental.png",category:"Lingerie"},
{id:8,name:"Vibrador Duplo",price:349.90,image:"duplo.png",category:"Bem-estar"},
{id:9,name:"Óleo Corporal",price:59.90,image:"oleo.png",category:"Cosméticos"},
{id:10,name:"Conjunto de Renda Premium",price:139.90,image:"conjunto.png",category:"Lingerie"},
{id:11,name:"Coleira com Guia",price:99.90,image:"coleira.png",category:"Acessórios"},
{id:12,name:"Body em Tule",price:159.90,image:"body_tule.png",category:"Lingerie"}];
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function card(p){return `<article class="product-card"><div class="product-image"><img src="assets/${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><div class="product-name">${p.name}</div><div class="product-meta"><span class="price">${money(p.price)}</span><span class="category-tag">${p.category}</span></div><button class="add-cart" data-add="${p.id}">adicionar ao carrinho</button></div></article>`}
const home=document.querySelector("#home-products");if(home)home.innerHTML=products.slice(0,4).map(card).join("");
const catalog=document.querySelector("#catalog-products");let activeFilter="Todos";let searchTerm=new URLSearchParams(location.search).get("q")||"";
function renderCatalog(){if(!catalog)return;let list=products.filter(p=>(activeFilter==="Todos"||p.category===activeFilter)&&(`${p.name} ${p.category}`).toLocaleLowerCase("pt-BR").includes(searchTerm.toLocaleLowerCase("pt-BR")));const sort=document.querySelector("#sort")?.value||"featured";if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));catalog.innerHTML=list.map(card).join("")||'<p class="empty-state">nenhum produto encontrado nessa seleção.</p>';const count=document.querySelector("#result-count");if(count)count.textContent=`${list.length} ${list.length===1?"item":"itens"}`}
if(catalog){document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.filter;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderCatalog()}));document.querySelector("#sort").addEventListener("change",renderCatalog);renderCatalog()}
document.querySelectorAll(".search").forEach(form=>{const input=form.querySelector("input");if(input&&searchTerm)input.value=searchTerm});
document.addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(btn){const p=products.find(p=>p.id===Number(btn.dataset.add));btn.textContent="adicionado à sacola ✓";setTimeout(()=>btn.textContent="adicionar ao carrinho",1500);}});
document.querySelectorAll(".menu-toggle").forEach(btn=>btn.addEventListener("click",()=>document.querySelector(".nav")?.classList.toggle("open")));
document.querySelectorAll(".subscribe").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const button=form.querySelector("button");button.textContent="inscrição recebida ✓";form.reset()}));
