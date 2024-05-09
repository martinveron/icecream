const saboresPorPote = { 
  '1/4': 3,
  '1/2': 4,
  '1': 5
}; //Declaro la constante de la cantidad de sabores por pote

let saboresSeleccionados = []; //Declaro la variable para almacenar los sabores seleccionados por el usuario

const tipoPoteSeleccionadoLS = localStorage.getItem('tipoPoteSeleccionado'); // Recuperar el tipo de pote seleccionado del localStorage

const saboresSeleccionadosLS = JSON.parse(localStorage.getItem('saboresSeleccionados')) || []; // Recuperar los sabores seleccionados del localStorage

if (tipoPoteSeleccionadoLS) {
  document.getElementById('tipoPote').value = tipoPoteSeleccionadoLS;
}; //Condicion por si llegase a haber algo en el local storage que corresponda al select

if (saboresSeleccionadosLS.length > 0) {
  saboresSeleccionados = saboresSeleccionadosLS;
  actualizarListaSeleccionados();
}; //Lo mismo que arriba pero para los sabores

function cargarSaboresDesdeJSON() { //// Esta función para cargar la lista de sabores desde un archivo JSON local.
  fetch('sabores.json') // Solicitud para obtener el archivo sabores.json.
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar la lista de sabores de helado');
      }
      return response.json(); // Se convierte la respuesta en formato JSON.
    })
    .then(data => {
      generarListaSabores(data.sabores); //Llamo a la funcion para mostrar los sabores en la interfaz
    })
    .catch(error => {
      console.error('Hubo un problema al cargar los sabores de helado:', error);
    });
}

function generarListaSabores(sabores) { //Esta funcion genera visualmente la lista de sabores en la interfaz
  const saboresDiv = document.getElementById('sabores'); //Vinculo el div a una constante
  saboresDiv.innerHTML = ''; //Me aseguro de que empiece vacio

  sabores.forEach(sabor => { //Funcion flecha, por cada sabor en el array de sabores:
    const saborSpan = document.createElement('span'); //Me crea un elemento span y lo vinculo a la constante
    saborSpan.textContent = sabor; //Establece el texto del elemento span con el valor del sabor actual del array.

    const agregarBtn = document.createElement('button'); //Me crea un boton y lo vinculo a una constante
    agregarBtn.textContent = '+'; //Le agrego un simbolo + para que simbolize "Agregar sabor a mi pote"
    agregarBtn.addEventListener('click', function(event) { //Agrego un escuchador de click
      event.preventDefault(); //Prevengo el comportamiento por defecto porque me enviaba el formulario cada vez que le daba a cualquier boton.
      agregarSabor(sabor); //Llama a la función con el sabor actual
    });

    saboresDiv.appendChild(saborSpan); //Me aseguro de que el span sea hijo del div sabores
    saboresDiv.appendChild(agregarBtn); //Lo mismo de arriba pero con el boton
  });
}

function agregarSabor(sabor) { //ESTA FUNCION AGREGA SABORES AL ARRAY DE SABORES SELECCIONADOS (se usa dentro de la funcion anterior)
  const tipoPote = document.getElementById('tipoPote').value; //Declaro la constante y la vinculo al select de potes
  const numSaboresPermitidos = saboresPorPote[tipoPote]; //Declaro la constante para definir la cantidad de sabores permitidos segun el pote que se haya seleccionado

  if (saboresSeleccionados.length < numSaboresPermitidos) { //Condicion para limitar el numero de sabores por pote
    if (!saboresSeleccionados.includes(sabor)) { //Condicion para evitar repeticion de sabores en un pedido
      saboresSeleccionados.push(sabor); //Push del sabor al array
      localStorage.setItem('saboresSeleccionados', JSON.stringify(saboresSeleccionados));
      actualizarListaSeleccionados();
    } else {
      swalInfo('Ya has seleccionado este sabor.');
    }
  } else {
    swalError(`Ya has seleccionado el máximo de ${numSaboresPermitidos} sabores permitidos.`);
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

document.getElementById('tipoPote').addEventListener('change', function() {  // Agrego el evento change para escuchar todos los cambios que ocurran en el select de potes
  const tipoPoteSeleccionado = this.value; // Declaro la constante del pote seleccionado en ese momento. This hace referencia a ese elemento y value al valor en ese momento.
  localStorage.setItem('tipoPoteSeleccionado', tipoPoteSeleccionado); //Almaceno en el local storage el tipo de pote seleccionado
  const numSaboresPermitidos = saboresPorPote[tipoPoteSeleccionado]; // Declaro una constante para vincularla con el pote seleccionado, accediendo al valor del objeto

  if (saboresSeleccionados.length > numSaboresPermitidos) { //Condicion para comprobar si el tamaño del array de los sabores es mayor al de los permitidos
    const mensaje = `El nuevo tamaño del pote solo permite ${numSaboresPermitidos} sabores. Se eliminarán los sabores excedentes.`; // Crea un mensaje indicando que se eliminarán los sabores excedentes
    swalInfo(mensaje); //Disparador del mensaje de la libreria sweet alert con el signo de info
    saboresSeleccionados.splice(numSaboresPermitidos); //Uso el metodo splice y le paso el valor de los sabores permitidos, lo que me deja la lista con los primeros sabores que selecciono borrando el o los excedentes
    actualizarListaSeleccionados(); //Llamo a la funcion para que se actualice la lista
  }
  cargarSaboresDesdeJSON(); // REVISAR
}); 

document.querySelector('#heladoForm button[type="button"]').addEventListener('click', function() { // Evento para el click de boton que simula el envio del formulario a un futuro backend (por ahora solo lo reinicia)
  swalSuccess('¡Pedido realizado!'); //Disparador del mensaje de la libreria sweet alert con el signo de success
  localStorage.clear(); //Limpio la local storage porque si no me quedan guardados los sabores para siempre
  resetearSeleccion(); // Reseteo el formulario y la seleccion de pote
  cargarSaboresDesdeJSON(); // REVISAR
});


function swalInfo(mensaje) { //Funcion para la libreria sweet alert con el icono de info
  Swal.fire({
    text: mensaje,
    icon: 'info',
    confirmButtonText: 'Cerrar'
  });
}

function swalError(mensaje) { //Funcion para la libreria sweet alert con el icono de error
  Swal.fire({
    text: mensaje,
    icon: 'error',
    confirmButtonText: 'Cerrar'
  });
}

function swalSuccess(mensaje) { //Funcion para la libreria sweet alert con el icono de success
  Swal.fire({
    text: mensaje,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  });
}

function resetearSeleccion() { // Creo una funcion para dejar los sabores seleccionados a 0
  saboresSeleccionados = []; // Limpio el array de sabores seleccionados
  actualizarListaSeleccionados(); //Ejecuto la funcion para actualizar la interfaz del usuario donde se ven los sabores seleccionados
  document.getElementById('tipoPote').selectedIndex = 0; // Forzamos que la seleccion por defecto sea la primera (la que esta vacia)
  cargarSaboresDesdeJSON(); // Cargar los sabores nuevamente
}

cargarSaboresDesdeJSON();
