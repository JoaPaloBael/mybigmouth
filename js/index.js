//------------------------------------------------------------¿Cuántos discos de Oasis te faltan?
//--Variable Global
const btnEnterate = document.querySelector('#enterateBoton');

//1. Capturar el click de "Enterate Acá" + agregar formulario
btnEnterate.onclick = function () {
    //---Variables locales
    let divForm = document.querySelector('#insertarForm');
    let formPadre = document.createElement("form");
    //2. Insertar dentro de formPadre: h2 + input number + input submit.
    formPadre.innerHTML =
        `<h2>¿Cuántos discos de Oasis tenés?</h2>
        <div class="inputFormDiscos"><input type="number" required="true" min="0" max="48" id="discosUsuario">
        <input type="submit" value="OK" class="cta"></div>`
    divForm.appendChild(formPadre);

    //3. Capturar dato del input dentro del evento onsubmit
    divForm.onsubmit = (event) => {
        event.preventDefault();
        //---Variables locales
        const totalDiscos = 48;
        let discosUsuario = document.querySelector('#discosUsuario');
        let discosUsuarioAsNumber = discosUsuario.valueAsNumber
        console.log(discosUsuarioAsNumber); //yassssss (pequeña victoria);

        //4. Arrow function que reste totalDiscos - la cantidad de discos del usuario
        const coleccionCompleta = () => { return (totalDiscos - discosUsuarioAsNumber);};

        //5. Bucle IF para mostar resultado en pantalla y cambiar el texto.
        function mostrarResultado() {
            if (discosUsuarioAsNumber === 0) {
                document.getElementById("cambiar").innerHTML =("En serio no tenés ninguno? <br><span class='blanco'>Pasate por nuestra tienda!</span>");
            } else if (coleccionCompleta() > 0 && coleccionCompleta() < 48) {
                document.getElementById("cambiar").innerHTML = (`<span class='blanco'>Te faltan ${coleccionCompleta()} discos</span> para completar la colección. <span class='blanco'>Pasate por nuestra tienda y descubrí cuales son!</span>`);
            } else {
                document.getElementById("cambiar").innerHTML = ("Buenísimo, los tenes todos! Pasa por nuestra tienda a ver el merchandising!");
            }
        }
        //6. Función que elimine el form
        function eliminarForm (){
            const inputDiscos = document.querySelector('#insertarForm');
            inputDiscos.classList.add("eliminar");
            btnEnterate.innerHTML = "<a href='tienda.html' class='enterateHref'>Ir a la tienda</a>"
        } //Segunda pequeña victoria!

        eliminarForm();
        mostrarResultado();
    }
}


//------------------------------------------------------------ Formulario Staff
const KEY_STORAGE = 'staffData';
let staff = cargar(KEY_STORAGE);
let formularioStaff = document.getElementById('formulario-staff');
let contenedorMenu = document.getElementById('staff-contenedor')

formularioStaff.addEventListener('submit', (event) => {
    event.preventDefault();
    agregarStaff(event.target.elements.titulo);
})

function agregarStaff(campo) {
    staff.push(campo.value);
    campo.value = '';
    guardar(staff);
    renderStaff();
}

function renderStaff() {
    let ultimoItem = staff.pop();
    contenedorMenu.appendChild(construirItem(ultimoItem));
}

function construirItem(staffItem) {
    let item = document.createElement('li');
    item.textContent = staffItem;
    return item;
}

function guardar(staffData) {
    sessionStorage.setItem(KEY_STORAGE, JSON.stringify(staffData));
}

function cargar(storageKey) {
    if (sessionStorage.getItem(storageKey)) {
        return JSON.parse(sessionStorage.getItem(storageKey));
    } else {
        return [];
    }
}

function iniciarStaff() {
    staff.forEach(item => {
        contenedorMenu.appendChild(construirItem(item));
    });
}

iniciarStaff();