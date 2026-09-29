// aqui va la lista donde se van guardando los alumnos que agrego, empieza vacia
let alumnos = [];

// funcion que agarra lo que escribi en el formulario
function getDatosFormulario() {

    // busca el input del nombre y saca lo que escribi ahi
    let nombre = document.getElementById("nombre").value;

    // convierte lo que puse en calificacion1 de texto a numero decimal
    let calificacion1 = parseFloat(document.getElementById("calificacion1").value);
    // igual pero con la calificacion 2
    let calificacion2 = parseFloat(document.getElementById("calificacion2").value);
    // igual pero con la calificacion 3
    let calificacion3 = parseFloat(document.getElementById("calificacion3").value);
    // igual pero con la calificacion 4
    let calificacion4 = parseFloat(document.getElementById("calificacion4").value);

    // regresa un objeto (una ficha) con todos esos datos juntos
    return { nombre, calificacion1, calificacion2, calificacion3, calificacion4 };
}

// funcion que revisa si el nombre y las calificaciones estan bien puestas
function datosValidos(datos) {
    // si el nombre esta vacio o alguna calificacion no es numero, regresa false, si no true
    return !(
        datos.nombre.trim() === "" ||
        isNaN(datos.calificacion1) ||
        isNaN(datos.calificacion2) ||
        isNaN(datos.calificacion3) ||
        isNaN(datos.calificacion4)
    );
}

// funcion que calcula el promedio y decide que mensaje le toca al alumno
function calcularPromedioYMensaje(datos) {
    // suma las 4 calificaciones y las divide entre 4 pa sacar el promedio
    let promedio =
        (datos.calificacion1 + datos.calificacion2 + datos.calificacion3 + datos.calificacion4) / 4;

    // aqui guardo el mensaje que le va a tocar segun el promedio
    let mensaje = "";

    // si el promedio es 9 o mas
    if (promedio >= 9) {
        mensaje = "EXCELENTE :)";
    // si es entre 8 y 9
    } else if (promedio >= 8) {
        mensaje = "MUY BIEN";
    // si es entre 7 y 8
    } else if (promedio >= 7) {
        mensaje = "BIEN";
    // si es entre 6.5 y 7
    } else if (promedio >= 6.5) {
        mensaje = "PIENSA IRTE A CONTABILIDAD";
    // si es entre 6 y 6.5
    } else if (promedio >= 6) {
        mensaje = "DATE DE BAJA :/";
    // si es menos de 6
    } else {
        mensaje = "VETE A TURISMO O A VOCA 11 :/";
    }

    // regresa el promedio y el mensaje juntos en un objeto
    return { promedio, mensaje };
}

// funcion del boton calcular promedio, solo muestra el resultado, no lo guarda
function calcularPromedio() {

    // agarra los datos que puse en el formulario
    let datos = getDatosFormulario();

    // si los datos no estan validos, avisa y corta la funcion aqui
    if (!datosValidos(datos)) {
        document.getElementById("resultado").innerHTML =
            "Por favor, completa todos los datos.";
        return;
    }

    // saca el promedio y el mensaje del objeto que regresa la funcion de arriba
    let { promedio, mensaje } = calcularPromedioYMensaje(datos);

    // mete el resultado armado en html dentro del div resultado
    document.getElementById("resultado").innerHTML =
        "<strong>Alumno:</strong> " + datos.nombre +
        "<br><strong>Promedio:</strong> " + promedio.toFixed(2) +
        "<br><br>" + mensaje;
}

// funcion del boton agregar alumno, este si lo guarda en la lista
function agregarAlumno() {

    // agarra los datos del formulario otra vez
    let datos = getDatosFormulario();

    // checa que esten completos, si no avisa y se sale
    if (!datosValidos(datos)) {
        document.getElementById("resultado").innerHTML =
            "Por favor, completa todos los datos.";
        return;
    }

    // saca promedio y mensaje ya calculados
    let { promedio, mensaje } = calcularPromedioYMensaje(datos);

    // mete un objeto nuevo con el alumno al final del arreglo alumnos
    alumnos.push({
        nombre: datos.nombre,
        promedio: promedio.toFixed(2),
        mensaje: mensaje
    });

    // repinta la lista completa con el alumno nuevo ya adentro
    mostrarAlumnos();
    // limpia el formulario pa poder meter al siguiente alumno
    limpiarFormulario();
}

// funcion que recorre el arreglo alumnos y los va pintando en pantalla
function mostrarAlumnos() {

    // si el arreglo esta vacio deja el resultado en blanco y se sale
    if (alumnos.length === 0) {
        document.getElementById("resultado").innerHTML = "";
        return;
    }

    // aqui voy armando el texto que se va a mostrar, empieza con el titulo
    let html = "<h3>Lista d e alumnos</h3>";

    // recorre cada alumno del arreglo uno por uno
    alumnos.forEach(function (alumno, index) {
        // le va pegando un parrafo por cada alumno con su numero, nombre, promedio y mensaje
        html +=
            "<p><strong>Alumno " + (index + 1) + ":</strong> " +
            alumno.nombre +
            " — Promedio: " + alumno.promedio +
            " (" + alumno.mensaje + ")</p>";
    });

    // ya que termino de armar todo el texto lo mete al div resultado
    document.getElementById("resultado").innerHTML = html;
}

// funcion del boton limpiar, borra el formulario pero no la lista de alumnos
function limpiarFormulario() {
    // deja el input del nombre vacio
    document.getElementById("nombre").value = "";
    // deja el input de la edad vacio
    document.getElementById("edad").value = "";
    // deja la calificacion 1 vacia
    document.getElementById("calificacion1").value = "";
    // deja la calificacion 2 vacia
    document.getElementById("calificacion2").value = "";
    // deja la calificacion 3 vacia
    document.getElementById("calificacion3").value = "";
    // deja la calificacion 4 vacia
    document.getElementById("calificacion4").value = "";
}

// funcion del boton restablecer, borra todo hasta la lista de alumnos
function restablecerTodo() {
    // vacia el arreglo de alumnos por completo
    alumnos = [];
    // limpia tambien el formulario
    limpiarFormulario();
    // y borra lo que se estuviera viendo en el resultado
    document.getElementById("resultado").innerHTML = "";
}