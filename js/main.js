listaSabores = [
    "Chocolate",
    "Vainilla",
    "Fresa",
    "Menta",
    "Limón",
    "Napolitano",
    "Cookies and Cream",
    "Mango",
    "Frutos del Bosque",
    "Café",
    "Caramelo",
    "Avellana",
    "Pistacho",
    "Mocha",
    "Tiramisú",
    "Tarta de Queso",
    "Piña Colada",
    "Plátano",
    "Coco",
    "Chicle",
    "Cereza",
    "Mora",
    "Miel",
    "Almendra",
    "Maracuyá",
    "Galleta",
    "Canela",
    "Arándano",
    "Ruibarbo",
    "Jengibre"
  ]; //Declaro la constante de todos los sabores posibles para su eleccion
  
  const saboresPorPote = {
    '1/4': 3,
    '1/2': 4,
    '1': 5
  }; //Declaro la constante de la cantidad de sabores por pote
  
  let saboresSeleccionados = []; //Declaro la variable para almacenar los sabores seleccionados por el usuario
  
  
  const tipoPoteSeleccionadoLS = localStorage.getItem('tipoPoteSeleccionado'); // Recuperar el tipo de pote seleccionado del localStorage
  
  
  const saboresSeleccionadosLS = JSON.parse(localStorage.getItem('saboresSeleccionados')) || []; // Recuperar los sabores seleccionados del localStorage
  
  
  if (tipoPoteSeleccionadoLS) { //Condicion por si llegase a haber algo en el local storage que corresponda al select
    document.getElementById('tipoPote').value = tipoPoteSeleccionadoLS;
  }
  
  
  if (saboresSeleccionadosLS.length > 0) { //Lo mismo que arriba pero para los sabores
    saboresSeleccionados = saboresSeleccionadosLS;
    actualizarListaSeleccionados();
  }
  
  function generarListaSabores() { //LA FUNCION EN DEFINITIVA GENERA UNA LISTA DE SABORES DISPONIBLES CON UN BOTON + A UN COSTADO PARA AGREGARLO AL ARRAY DE SABORES SELECCIONADOS
    const tipoPote = document.getElementById('tipoPote').value; //Vinculo la constante con el seleccionador de potes.
    const numSaboresPermitidos = saboresPorPote[tipoPote]; //Declaro una constante para establecer un limite de sabores por pote.
  
    const saboresDiv = document.getElementById('sabores'); //Vinculo el div a una constante
    saboresDiv.innerHTML = ''; //Me aseguro de que el div siempre inicie vacio
  
    listaSabores.forEach(sabor => { //Funcion flecha, por cada sabor en el array de sabores:
      const saborSpan = document.createElement('span'); //Me crea un elemento span y lo vinculo a la constante
      saborSpan.textContent = sabor; //Establece el texto del elemento span con el valor del sabor actual del array.
  
      const agregarBtn = document.createElement('button'); //Me crea un boton y lo vinculo a una constante
      agregarBtn.textContent = '+'; //Le agrego un simbolo + para que simbolize "Agregar sabor a mi pote"
      agregarBtn.addEventListener('click', function(event) { //Agrego un escuchador de click
        event.preventDefault(); //Prevengo el comportamiento por defecto porque me enviaba el formulario cada vez que le daba a cualquier boton.
        agregarSabor(sabor, numSaboresPermitidos); //Llama a la función con el sabor actual y el número de sabores permitidos.
      });
  
      saboresDiv.appendChild(saborSpan); //Me aseguro de que el span sea hijo del div sabores
      saboresDiv.appendChild(agregarBtn); //Lo mismo de arriba pero con el boton
    });
  }
  function agregarSabor(sabor, numSaboresPermitidos) { //ESTA FUNCION AGREGA SABORES AL ARRAY DE SABORES SELECCIONADOS (se usa dentro de la funcion anterior)
    if (saboresSeleccionados.length < numSaboresPermitidos) { //Condicion para limitar el numero de sabores por pote
      if (!saboresSeleccionados.includes(sabor)) { //Condicion para evitar repeticion de sabores en un pedido
        saboresSeleccionados.push(sabor); //Push del sabor al array
        localStorage.setItem('saboresSeleccionados', JSON.stringify(saboresSeleccionados));
        actualizarListaSeleccionados(); //Se llama a la funcion
      } else {
        mostrarMensaje('Ya has seleccionado este sabor.');
      }
    } else {
      mostrarMensaje(`Ya has seleccionado el máximo de ${numSaboresPermitidos} sabores permitidos.`);
    }
  }
  
  function actualizarListaSeleccionados() { //ESTA FUNCION ES LA QUE PERMITE QUE SE VAYAN MOSTRANDO LOS SABORES SELECCIONADO DEBAJO
    const listaSeleccionados = document.getElementById('listaSeleccionados'); //Declaro la constante y la vinculo con la lista
    listaSeleccionados.innerHTML = ''; //Me aseguro de que la lista empiece vacia
  
    saboresSeleccionados.forEach(sabor => { //Funcion flecha que agrega un li a la ul de los sabores seleccionados
      const saborItem = document.createElement('li'); //declaro la constante y la vinculo con el/las li
      saborItem.textContent = sabor; // Modifico el texto del li para que sea el mismo que el sabor
      listaSeleccionados.appendChild(saborItem); //Vinculo el li creado con el ul del html
    });
  }
  
  //EN ESTA PARTE ARREGLO UN PROBLEMA QUE ME PERMITIA ENVIAR EL FORMULARIO CON MAS SABORES DE LOS PERMITIDOS EN CIERTOS POTES SI ELEGIA PRIMERO EL MAS GRANDE Y LE AGREGABA LOS SABORES Y LUEGO VOLVIA AL PEQUEÑO
  
  document.getElementById('tipoPote').addEventListener('change', function() {// Agrego el evento change para escuchar todos los cambios que ocurran en el select de potes
  
  const tipoPoteSeleccionado = this.value; // Declaro la constante del pote seleccionado en ese momento. This hace referencia a ese elemento y value al valor en ese momento.
  localStorage.setItem('tipoPoteSeleccionado', tipoPoteSeleccionado); //Almaceno en el local storage el tipo de pote seleccionado
  const numSaboresPermitidos = saboresPorPote[tipoPoteSeleccionado]; // Declaro una variable para vincularla con el pote seleccionado, accediendo al valor del objeto
    if (saboresSeleccionados.length > numSaboresPermitidos) { //Condicion para comprobar si el tamaño del array de los sabores es mayor al de los permitidos
      // Crea un mensaje indicando que se eliminarán los sabores excedentes
      const mensaje = `El nuevo tamaño del pote solo permite ${numSaboresPermitidos} sabores. Se eliminarán los sabores excedentes.`;
      // Muestra una alerta con el mensaje creado
      mostrarMensaje(mensaje);
  
      // Elimina los sabores excedentes del array de sabores seleccionados
      saboresSeleccionados.splice(numSaboresPermitidos); //Uso el metodo splice y le paso el valor de los sabores permitidos, lo que me deja la lista con los primeros sabores que selecciono borrando el o los excedentes
      actualizarListaSeleccionados(); //Llamo a la funcion para que se actualice la lista
  }
  generarListaSabores(); //Genero la lista nuevamente para que muestre el contenido actualizado
  });
  
  
  document.querySelector('#heladoForm button[type="button"]').addEventListener('click', function() { // Evento para el click de boton que simula el envio del formulario a un futuro backend (por ahora solo lo reinicia)
  mostrarMensaje('¡Pedido realizado!'); // Reemplazo del alert de pedido realizado con un div en la parte de abajo
  localStorage.clear(); //Limpio la local storage porque si no me quedan guardados los sabores para siempre (en este caso limpia toda la storage, podria buscar como limpiar solo lo que necesito pero literalmente es lo ultimo que estoy haciendo si no no llego, para la proxima pre entrega prometo arreglarlo)
  resetearSeleccion(); // Reseteo el formulario y la seleccion de pote
  });
  
  function mostrarMensaje(mensaje) { //En reemplazo del alert uso este div para ir mostrando informacion (podria hacerlo flotante y oscurecer el fondo, es mi idea principal pero por el momento se va a quedar asi)
    const mensajeDiv = document.getElementById('mensajeDiv'); //Vinculo el div a una constante 
    const mensajeContenido = document.getElementById('mensajeContenido'); //Vinculo el span del html a una constante
    const cerrarBoton = document.getElementById('cerrarMensaje'); //Vinculo el boton para cerrar el div (ocultarlo)
    mensajeContenido.textContent = mensaje; //Vinculo el parametro de la funcion con el texto que se mostrara en el span
    mensajeDiv.style.display = 'block'; //Hago visible el span
    cerrarBoton.addEventListener('click', function(event) { //Escuchador para el boton de cerrar
      event.preventDefault(); // Prevenir el comportamiento por defecto
      mensajeDiv.style.display = 'none'; //Vuelvo a ocultar el div una vez pulsado el boton cerrar
    });
  }
  
  
  function resetearSeleccion() { // Creo una funcion para dejar los sabores seleccionados a 0
  saboresSeleccionados = []; // Limpio el array de sabores seleccionados
  actualizarListaSeleccionados(); //Ejecuto la funcion para actualizar la interfaz del usuario donde se ven los sabores seleccionados
  document.getElementById('tipoPote').selectedIndex = 0; // Forzamos que la seleccion por defecto sea la primera (la que esta vacia)
  generarListaSabores(); //Vuelvo a ejecutar la funcion que genera la lista de sabores para comenzar con un nuevo pedido
  }
  
  