var faker = require("faker");

for (let i = 0; i < 10; i++) {
    var product = faker.commerce.productName();
    var price = faker.commerce.price();
    console.log(product + " - $" + price.toString());
}