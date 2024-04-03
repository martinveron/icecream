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

function comprarHelado() {
    // Lista de sabores en un array
    const listaSabores = [
        "Chocolate", "Vainilla", "Fresa", "Menta", "Limón", "Napolitano", "Dulce de Leche", "Mango", 
        "Frutos del Bosque", "Café", "Caramelo", "Avellana", "Pistacho", "Mocha", "Tiramisú", 
        "Kinder", "Limon", "Banana Split", "Coco", "Chicle", "Cereza", "Mora", "Miel", "Almendra", 
        "Maracuyá", "Oreo", "Canela", "Arándano", "Ruibarbo", "Jengibre"
    ];
    //Declaro las constantes para los tamaños de los potes, en sabores dejo un array vacio para llenar luego con los prompts
    const poteCuarto = {nombre: "cuarto", nombreCompleto: "Cuarto de Kilo", cantidadSabores: 3, peso: 0.25, sabores: []};
    const poteMedio = {nombre: "medio", nombreCompleto: "Medio Kilo", cantidadSabores: 4, peso: 0.5, sabores: []};
    const poteKilo = {nombre: "kilo", nombreCompleto: "Un Kilogramo", cantidadSabores: 5, peso: 1, sabores: []};

    //Primer prompt que aparece para elegir el tamaño de pote
    let pote = prompt("Ingrese el peso de pote deseado. (cuarto, medio, kilo)").toLowerCase();
    //Declaro la variable para almacenar luego la selección del pote
    let poteSeleccionado;

    // Vincular la seleccion del usuario con los objetos comparando su nombre
    if (pote === "cuarto") {
        poteSeleccionado = poteCuarto;
    } else if (pote === "medio") {
        poteSeleccionado = poteMedio;
    } else if (pote === "kilo") {
        poteSeleccionado = poteKilo;
    } else {
        alert("Has ingresado un tamaño incorrecto, las opciones son: cuarto, medio, kilo.");
        return; // El return para interrumpir la funcion en caso de que el usuario cancele el prompt
    }

    // Bucles para definir la cantidad de sabores permitidos por cada pote
    for (let i = 0; i < poteSeleccionado.cantidadSabores; i++) { //iteración por cada sabor
        let sabor = prompt(`Ingrese el sabor ${i + 1} de ${poteSeleccionado.cantidadSabores}. Lista de sabores: ${listaSabores.join(', ')}`).toLowerCase(); //Declaro la variable sabor, luego incrustro la iteración del bucle +1 (porque la inicial es 0) luego incrustro la cantidad de sabores permitidos en la string y luego la lista de sabores separados con coma (para esto uso el .join)
        while (!listaSabores.map(s => s.toLowerCase()).includes(sabor)) {  //Este while es para asegurarnos de que el sabor solicitado este en la lista de sabores
            sabor = prompt(`Por favor, ingrese un sabor válido. Lista de sabores: ${listaSabores.join(', ')}`).toLowerCase(); //En caso de ingresar un sabor que no esté en la lista apareceria este prompt
        }
        poteSeleccionado.sabores.push(sabor); //Llevo al array el sabor almacenado en la variable sabor y se repite el ciclo hasta completar la cantidad de sabores correspondientes
    }

    // Usando las funciones que creé para la pre entrega anterior podemos calcular el precio de la misma manera.
    let customerRegular = confirm("¿Eres cliente habitual?");
    let pesoTotal = poteSeleccionado.peso;
    let precioFinal = finalPrice(pesoTotal, customerRegular);
    alert(`Has elegido un pote de ${poteSeleccionado.nombreCompleto} con los siguientes sabores: ${poteSeleccionado.sabores.join(', ')}. El precio final es: ${precioFinal} pesos.`);
}

comprarHelado();