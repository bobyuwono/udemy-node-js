//object property shorthand

const name = 'bob'
const age = 27

const user = {
    name,
    userAge: age
}

console.log(user)

// destructuring

const product = {
    label : 'red notebook',
    price: 4,
    salePrice: 3,
}

const { label: productLabel, price, rating=7} = product

const transaction = (type, {label, price}) => {
    console.log(type, label, price);
}

transaction('purchase', product)
