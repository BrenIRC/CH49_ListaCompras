const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtName = document.getElementById("Name");
const txtNumber= document.getElementById("Number");
const alertValidaciones= document.getElementById("alertValidaciones");
const alertValidacionesTexto= document.getElementById("alertValidacionesTexto");
const tablaListaCompras= document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0)
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");   

let cont = 0;
let costoTotal=0;
let TotalEnProductos=0;

let datos = []; 


//Bandera, al ser true permite agregar los datos a la tabla
let isValid =true;

function validaCantidad(){
    // Verifica si está vacío
    if(txtNumber.value.length <= 0){
        return false;
    }
    // Verifica si NO es un número
    if(isNaN(txtNumber.value)){
        return false;
    }
    // Verifica si el número es menor o igual a 0
    if(Number(txtNumber.value) <= 0){
        return false;
    }
    return true;
}

function getPrecio(){
     // Define una función llamada getPrecio que no recibe parámetros
    return Math.round(Math.random()*1000)/100;
    // Esta línea hace varias operaciones en secuencia:
    
    // 1. Math.random()           -> Genera un número aleatorio entre 0 y 1
    // 2. Math.random()*1000      -> Multiplica ese número por 1000 (da un rango de 0 a 999.999...)
    // 3. Math.round(...)         -> Redondea al entero más cercano
    // 4. ... /100                -> Divide entre 100 para obtener decimales
}

window.addEventListener("load", function() {
    if (this.localStorage.getItem("costoTotal")!==null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }
    if (this.localStorage.getItem("TotalEnProductos")!==null){
        TotalEnProductos = Number(this.localStorage.getItem("TotalEnProductos"));
    }
    if (this.localStorage.getItem("cont")!==null){
        cont = Number(this.localStorage.getItem("cont"));
    }
    if (this.localStorage.getItem("datos")!==null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }

    datos.forEach((r)=>{
        let row = `<tr> 
        <td>${r.cont}</td>
        <td>${r.nombre}</td>
        <td>${r.cantidad}</td>
        <td>${r.precio}</td> 
   </tr>`;
     cuerpoTabla.insertAdjacentHTML("beforeend", row); // Cambio aquí
    });
    
    // Actualizar la UI con los valores cargados
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = TotalEnProductos;
});
    
    // Actualizar la UI con los valores cargados
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = TotalEnProductos;

// Agrega un escuchador de eventos al botón que se activa cuando se hace clic
btnAgregar.addEventListener("click", function (event){
    // Previene el comportamiento predeterminado del formulario (evita que la página se recargue)
    event.preventDefault();
    // Limpia cualquier estilo de borde previo del campo de nombre
    txtName.style.border = "";

    // Elimina espacios en blanco al inicio y final del valor del campo nombre
    txtName.value = txtName.value.trim();
    // Elimina espacios en blanco al inicio y final del valor del campo cantidad
    txtNumber.value = txtNumber.value.trim(); 
    // Limpia cualquier mensaje de error previo
    alertValidacionesTexto.innerHTML="";
    // Oculta el contenedor de alertas de validación
    alertValidaciones.style.display="none"
    
    isValid = true; // Resetear isValid al inicio de cada validación

    // Verifica si el nombre tiene menos de 3 caracteres
    if(txtName.value.length<3){
        //1. Mostrar alerta con el error
        //2.Borde de color rojo
        // Si el nombre es muy corto, agrega un borde rojo al campo
        txtName.style.border = "solid red medium"; // Etiqueta de borde, pone tipo, color, tamaño y grosor
        alertValidacionesTexto.innerHTML=
        // Muestra mensaje de error para el nombre
            "<strong>El nombre del producto no es correcto</strong>", //Strong: sirve para resaltar un texto.
        // Hace visible el contenedor de alertas
        alertValidaciones.style.display="block"
        isValid=false // no es valido
    }// length<3

    // Verifica si la cantidad NO es válida (llama a la función validaCantidad)
    if (! validaCantidad()){// si regresa false
        // Si la cantidad es inválida, agrega un borde rojo al campo
        txtNumber.style.border = "solid red medium"; 
        // Agrega mensaje de error para la cantidad (el += concatena este mensaje al anterior si existe)
        alertValidacionesTexto.innerHTML+=               
                "<br/><strong>La cantidad no es correcta</strong>"; 
        alertValidaciones.style.display="block"
        // Hace visible el contenedor de alertas
        isValid=false // no es valido
    }

    if (isValid){   //Si es valida la cantidad y el nombre por lo cual el elemnto puede añadirse a la tabla
        //Agregar los datos a la tabla
        cont++;
        let precio= getPrecio();
        let row = `<tr> 
             <td>${cont}</td>
             <td>${txtName.value}</td>
             <td>${txtNumber.value}</td>
             <td>${precio}</td> 
        </tr>`;
        let elemento= { "cont" : cont,
                         "nombre":txtName.value,
                         "cantidad":txtNumber.value,
                          "precio":precio
                      };
         
        datos.push(elemento);
        // Agrega un nuevo elemento al final del array 'datos'
        
        localStorage.setItem("datos", JSON.stringify(datos));
        // Esta línea hace dos operaciones principales:

       // 1. JSON.stringify(datos)
      // - Convierte el array 'datos' en una cadena de texto JSON
      // - Necesario porque localStorage solo almacena strings

     // 2. localStorage.setItem("datos", ...)
     // - Guarda la cadena JSON en el almacenamiento local del navegador
     // - "datos" es la clave (key) para recuperar esta información después

        cuerpoTabla.insertAdjacentHTML("beforeend" , row);
        // Inserta el contenido HTML (guardado en row) al final del elemento cuerpoTabla
        // "beforeend" significa que se insertará justo antes del cierre del elemento
        // Es una forma más eficiente que innerHTML para agregar contenido
        
        costoTotal+= precio * Number(txtNumber.value);
        // Esta línea hace varias operaciones:
        // 1. Number(txtNumber.value) -> Convierte el valor del campo de texto a número
        // 2. precio * ... -> Multiplica el precio por la cantidad
        // 3. costoTotal += ... -> Suma el resultado al costoTotal existente
        // El operador += significa "suma y asigna"
        
        precioTotal.innerText = "$" + costoTotal.toFixed(2);       
        // Esta línea actualiza el texto mostrado en el elemento precioTotal:
        // 1. costoTotal.toFixed(2) -> Formatea el número para mostrar 2 decimales
        // 2. "$" + ... -> Agrega el símbolo de dólar al inicio
        // 3. innerText = ... -> Actualiza el texto visible del elemento  
        
        contadorProductos.innerText = cont;
        TotalEnProductos+= Number(txtNumber.value);
        productosTotal.innerText = TotalEnProductos;

        // Guardar en localStorage después de actualizar valores
        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("TotalEnProductos", TotalEnProductos);
        localStorage.setItem("cont", cont);

        txtName.value="";
        // Limpia el campo de texto txtName asignándole una cadena vacía
        // Esto borra lo que el usuario escribió en el campo
        txtNumber.value="";
        // Limpia el campo de texto txtNumber asignándole una cadena vacía
        // Esto borra lo que el usuario escribió en el campo
        txtName.focus();
        // Coloca el cursor en el campo txtName
        // Esto permite al usuario empezar a escribir inmediatamente un nuevo elemento
    }
}); // Cierre correcto del btnAgregar

btnClear.addEventListener("click", function (event){
    // Previene el comportamiento predeterminado del formulario (evita que la página se recargue)
    event.preventDefault();
    // Limpia cualquier estilo de borde previo del campo de nombre
    txtName.style.border = "";

    // Elimina espacios en blanco al inicio y final del valor del campo nombre
    txtName.value = txtName.value.trim();
    // Elimina espacios en blanco al inicio y final del valor del campo cantidad
    txtNumber.value = txtNumber.value.trim(); 

    cont=0
    // Inicializa el contador de items a cero
    // Se usa típicamente para contar el número de productos o elementos
    costoTotal=0
    // Inicializa la variable que llevará la suma de todos los costos a cero
    // Almacenará el total monetario de todos los productos
    TotalEnProductos=0
    // Inicializa el contador del total de productos a cero
    // Puede ser diferente de 'cont' si se manejan cantidades por producto

    localStorage.setItem("costoTotal", costoTotal);
    localStorage.setItem("TotalEnProductos", TotalEnProductos);
    localStorage.setItem("cont", cont);

    // Actualizar la UI
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = TotalEnProductos;

    cuerpoTabla.innerHTML=""
    // Limpia cualquier mensaje de error previo
    alertValidacionesTexto.innerHTML="";
    // Oculta el contenedor de alertas de validación
    alertValidaciones.style.display="none"
});






/*
let row = `<tr>
    // Declara una variable 'row' usando template literals (backticks `) 
    // que permite crear strings multilínea y usar interpolación
    
    <td>${cont}</td>
    // Crea una celda de tabla con el valor de la variable 'cont'
    // ${} es la sintaxis de interpolación que inserta el valor de la variable
    
    <td>${txtName.value}</td>
    // Crea una celda con el valor del campo de texto txtName
    
    <td>${txtNumber.value}</td>
    // Crea una celda con el valor del campo de texto txtNumber
    
    <td>${precio}</td>
    // Crea una celda con el valor de la variable precio
    
</tr>`;
// Cierra la fila de la tabla y el template literal

cuerpoTabla.insertAdjacentHTML("beforeend", row);
// Inserta el HTML creado (row) al final del elemento cuerpoTabla
// "beforeend" significa que se insertará justo antes del cierre del elemento
*/




  //btnAgregar click

//El número de la lista de compras debe tener validaciones de:
//1. length <=0
//2.Número
//>0



//Primero vamos a definir variables
//Vamos a poner a hacer las validaciones
// Se marca con el if que pasará si tenemos error, en este caso, si en el campo le ponemos menos
// de 3 letras marca una alerta con rojo de que es invalido mi elemento.
// Hacer validación de casilla cantidad con el length (que exista algo), debe ser un campo de número
// y el número debe ser >0
// realizamos la tabla con isValid