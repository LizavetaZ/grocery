let cart = document.querySelector('.cartimage')
let cartConnection = document.querySelector('.cartform')
let close = document.querySelector('.cart-close')
let totalCart = document.querySelector('.totalCart')
let resultSum = document.querySelector('.result')
let cartWindow = document.querySelector('.cart-window')
let view = document.querySelector('.view')
// resultSum.value = 0;

// totalCart.setAttribute('goods', '0')

// console.log(totalCart)

let arr = []
let collection = []
totalCart.textContent = arr.length


class ProductMain {
    constructor(src, id, parentSelector, classfield, nameProduct, oldPrice, newPrice) {
        this.src = src;
        this.id = id;
        this.parent = document.querySelector(parentSelector);
        this.classfield = classfield;
        this.nameProduct = nameProduct;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
    }

    renderProduct() {
        const product = document.createElement('div');
        product.classList.add('product')
        product.innerHTML = `
        <div id="${this.id}" class="offer">
            <a class="product-classfield-button" href="#">${this.classfield}</a>
            <img src=${this.src} width="140px" height="140px">
            <p>${this.nameProduct}</p>
            <hr>
            <div class="prices">
                <a class="old-price" href="#"><s>${this.oldPrice}</s>USD</a>
                <a class="new-price" href="#">${this.newPrice}</a>
            </div>
            <div class="offer-btn">
                <button id="${this.id}" class="buy">КУПИТЬ</button>
            </div>

        </div>`
        this.parent.append(product);
    }

}




const renderView = () => {
    
        // fetch('http://localhost:3000/products')
        // .then(response => response.json())
        // .then(data => {
            
        //     data.forEach(({ src, id, parentSelector, classfield, nameProduct, oldPrice, newPrice }) => {
        //         new ProductMain(
        //             src,
        //             id,
        //             parentSelector,
        //             classfield,
        //             nameProduct,
        //             oldPrice,
        //             newPrice).renderProduct()
        //     })
        //     buyBottom()
        // })

        render().then(data => {
            
            data.forEach(({ src, id, parentSelector, classfield, nameProduct, oldPrice, newPrice }) => {
                new ProductMain(
                    src,
                    id,
                    parentSelector,
                    classfield,
                    nameProduct,
                    oldPrice,
                    newPrice).renderProduct()
            })
            buyBottom()
        })
    }
    



class ProductCart {
    constructor(src, id, parentSelector, nameProduct, newPrice, countrValue) {
        this.src = src;
        this.id = id;
        this.parent = document.querySelector('.cart-window');
        this.nameProduct = nameProduct;
        this.newPrice = newPrice;
        this.countrValue = countrValue = 1;
    }

    renderCart() {
        const cartview = document.createElement('div');
        cartview.classList.add('cartview')
        cartview.innerHTML = `
        <div id="${this.id}" class="order">
            <img class="del" src="/images/delete.png" width="20px" height="20px">
            <img src=${this.src} width="70px" height="90px">
            <p class="nameProduct">${this.nameProduct}</p> 
            <div class="counter" data-price="${this.newPrice}">
	            <button class="counter__btn" data-direction="minus">-</button>
	            <input type="text" value="${this.countrValue}" class="counter__value">
	            <button class="counter__btn" data-direction="plus">+</button>
                <input type="text" value="${this.newPrice * this.countrValue}" class="counter__price">
            </div>
            
        </div>`
        this.parent.append(cartview);
    }
}

const renderCartView = (arrayCart, arrId) => {
    // поменять переборы местами
    // создать словарик с повторяющимися айди
    // при повторении добавить к каунтре + 1
    // arrId.forEach (item => {
    //     if (arrayCart.find((product) => product.id === item)) {
    //         new ProductCart(
    //             product.src,
    //             product.id,
    //             product.parentSelector,
    //             product.nameProduct,
    //             product.newPrice,                
    //             product.countrValue).renderCart();
    //     } 
    // })
    console.log(arrId)

    arrayCart.forEach(product => {
        if (arrId.find((item) => item === product.id)) {           
            new ProductCart(
                product.src,
                product.id,
                product.parentSelector,
                product.nameProduct,
                product.newPrice,                
                product.countrValue
                ).renderCart(); 
                // collection.push(product.id)
            
            // checker(collection, product)
            // console.log(product.countrValue )
        }  
    })
    
    resultSum.value = Array.from(document.querySelectorAll('.counter__price'))
                           .map(item => item.value)
                           .reduce((ar , item) => {return ar + +item} , 0).toFixed(2)
    delButton()
    counter()
}

// const checker = (collection, product) => {
//     collection.forEach(item => {
//         if (item == product.id) {
//             product.countrValue ++
//         }
//         return product.countrValue
//     })
// }



const openCart = () => {

    cart.addEventListener('click', () => {
        cartConnection.classList.add('toggle-popup');
        cartWindow.innerHTML = ''
        render()
            .then(data => renderCartView(data, arr))
    })
}


const buyBottom = () => {
    const buy = document.querySelectorAll('.buy')
    console.log(buy)
    buy.forEach(item => {   //здесь ли это должно быть, по-другому кнопка не срабатывала
        item.addEventListener('click', () => {
            item.setAttribute("disabled", "disabled")
            arr.push(item.id)
            totalCart.textContent = arr.length
            console.log(arr)
        })
    })
}



const closeCart = () => {
    close.addEventListener('click', () => {
        cartConnection.classList.remove('toggle-popup');
    })
}


const counter = () => {
    // console.log('ere')
    cartWindow.addEventListener('click', (e) => {
        let totalSum = 0
        let target = e.target
        if (target.getAttribute('data-direction') === 'plus') {

            // <div class="counter" data-price="${this.newPrice}">
	        //     <button class="counter__btn" data-direction="minus">-</button>
	        //     <input type="text" value="1" class="counter__value">
	        //     <button class="counter__btn" data-direction="plus">+</button>
            //     <input type="text" value="${this.newPrice}" class="counter__price">
            // </div>


            let dataPrice = target.parentElement.getAttribute('data-price')
            let valuePrice = target.parentElement.querySelector('.counter__value')
            // let pricePrice = target.parentElement.querySelector('.counter__price')
            valuePrice.value++



            // resultSum.value = Array.from(document.querySelectorAll('.counter__price'))
                                    // // .map(item => item.value)
                                    // .reduce((totalSum, item) => {
                                    //     return totalSum + +item
                                    // }, 0)
            // resultSum.value += +pricePrice.value
            // valuePrice.setAttribute('value', valuePrice.value)
            arr.push(target.parentElement.parentElement.id)
            totalCart.textContent = arr.length
            console.log(target.parentElement.parentElement.id)
            console.log(arr)
        }
        if (target.getAttribute('data-direction') === 'minus') {
            let dataPrice = target.parentElement.getAttribute('data-price')
            let valuePrice = target.parentElement.querySelector('.counter__value')
            // let pricePrice = target.parentElement.querySelector('.counter__price')
            if (valuePrice.value - 1 >= 0 ? valuePrice.value - 1 : 0) { //можно ли без цикла??
                valuePrice.value--
                resultSum.value = parseFloat(dataPrice * valuePrice.value).toFixed(2)
                // resultSum.value -= +pricePrice.value

                totalCart.textContent = arr.length
                console.log(arr)
            }
            // valuePrice.setAttribute('value', valuePrice.value)
            // console.log('2')
            // resultSum.value -= +pricePrice.value
        }

        // resultSum.value = Array.from(document.querySelectorAll('.counter__price'))
        //                    .map(item => item.value)
        //                    .reduce((ar , item) => {return ar + +item} , 0).toFixed(2)

        
        // finalSum(resultSum)
        // resultSum.value = parseFloat(dataPrice * valuePrice.value).toFixed(2)
        
    })
    // resultSum.value  += parseFloat(resultSum.value).toFixed(2)
    
}

const delButton = () => {
    console.log('dsf')
    const del = document.querySelectorAll('.del')
    
    del.forEach(item => {
        item.addEventListener('click', (e) => {
            let target = e.target
            arr = arr.filter(elem => elem !== target.parentElement.id)
            // console.log(target.parentElement.id)
            // console.log('Oleg')
            totalCart.textContent = arr.length
            // console.log(arr)
            // render().then(data => renderCartView(data, arr))
        })
        
    })
    
}

// let del = delButton.bind(renderCartView())
// del()


const finalSum = (resultSum) => {
    
    let totatlPrice
    totatlPrice += resultSum.value;
    console.log(totatlPrice)
    return totatlPrice
    // console.log('result')
        // return
    // resultSum.value = totatlPrice
    // resultSum.value = totatlPrice
}

async function render() {
    let response = await fetch('http://localhost:3000/products')
    let answer = await response.json()
    return answer
}


const viewAll = () => {
    let index = 0;
    view.addEventListener('click', () => {
        while (index % 6 != 0) {
            renderView()
            index+=1
        }
        
        console.log('опять не работает')
    })
}

const resultS = () => {
    
}

renderView()
// counter()
viewAll()
openCart()
closeCart()






