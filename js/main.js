//Esta funcion calcula el precio del helado, siendo el precio por kilo 8000.

function priceCalculator(weight) { 
    let calculation = weight * 8000;
    return calculation;
}

//Esta funcion calcula el precio final de la compra considerando si es cliente habitual o no (mas adelante se haría el calculo segun las compras que haya realizado el usuario en el ultimo tiempo)

function finalPrice(weight, customerRegular) { 
    let calculation = priceCalculator(weight);
    if (customerRegular) {
        let discount = calculation * 0.85;
        return discount;
    } else {
        return calculation;
    }
}

//Esta variable sirve para validar el dato del prompt del peso del helado
let validInput = false; 
//Esta variable se declara para usar en el while como el precio que se mostrará en el alert final
let totalPrice;

//Este while valida que lo que ingresa la persona sea un numero mayor a 0.25, luego hace uso de las funciones de calculo de precios.
while (!validInput) {
    let weight = prompt("Ingrese el peso de su helado en kilogramos, siendo el minimo 1/4 (0.25)");

    if (!isNaN(weight) && weight > 0.25) {
        let customerRegular = confirm("¿Es usted cliente regular?");
        totalPrice = finalPrice(parseInt(weight), customerRegular);
        validInput = true;
    } else {
        alert("Ingrese un número válido para el peso.");
    }
}

alert("El precio final es: $" + totalPrice);