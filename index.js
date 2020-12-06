import api from './api.js'

const $productList = document.querySelector('.product-list');
const $price = document.querySelector('.action p strong')
 
const config = { 
  method: 'GET',
  url: 'products.json',
  data: null
}

const limitName = (name, tam) => {
  const limitedName = [...name].reduce((acc, letter, index) => {
    if (index === tam) return acc + '...';
    if (index > tam) return acc;
    return acc + letter;
  }, '')

  return limitedName;
}

const formatPrice = (value) => {

  const unformatted = value.toString();
  const length = unformatted.length;

  const formatted = parseFloat(
    `${unformatted.substring(0, length-2)}.${unformatted.substring(length-2)}`
    )
    .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

  return formatted
}

const render = (response) => {

  response.item.forEach((item) => {
    const limitedName = limitName(item.name, 50)
    $productList.innerHTML +=
      `<li>
        <div class='item-box'>
          <img src='${item.image}' alt='produto'>
          <div class='content'>
            <p class='title'>${limitedName}</p>
            <div class='content-info'>
              <p class='qtd'>Qtd. ${item.quantity}</p>
              <span class='price'>${item.bestPriceFormated}</span>
          </div>
          </div>
        </div>
      </li>`
  
  })

  const total =  response.item.reduce((acc,item) => {
    const value = item.bestPrice * item.quantity;
    return acc += value
  }, 0);

  $price.textContent = formatPrice(total)
 
}


api(config, render)
//Neste exercício você deve imprimir na UL ".product-list" produtos seguindo o layout no README do github: https://i.imgur.com/EbVlWpX.png
//Deve incluir a soma dos produtos
//O botão finalizar compra deve ter o href de "/checkout"
