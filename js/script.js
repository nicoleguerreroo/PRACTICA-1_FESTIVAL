/* abre el menu */
function openMenu() {
    console.log("funcion openMenu");
    document.getElementById("menu").firstElementChild.lastElementChild.style.left = "0";

}
/* cierra el menu */
function closeMenu() {
    console.log("funcion closeMenu");
    document.getElementById("menu").firstElementChild.lastElementChild.style.left = "-100%";
}

/* abre ventana modal */
function openModal(figura) {
    console.log("funcion openModal");
    // buscamos la ventana modal
    var modal = document.getElementById("modal");
    var rutaImagen = figura.firstElementChild.getAttribute("src");
    console.log("Valor de la ruta de la imagen: " + rutaImagen)
    var pieImagen = figura.lastElementChild.innerHTML;
    console.log("Pie de imagen: " + pieImagen);

    window.addEventListener("click", function (event) {
        var modal = document.getElementById("modal");
    
        // Si el click fue directamente sobre el fondo del modal (no dentro de la figura)
        if (event.target === modal) {
            closeModal();
        }
    });

    //opcion 1 para cambiar el atributo src de la imagen de la ventana modal
    //modal.querySelector("img").src = rutaImagen;

    //opcion 2 para cambiar el atributo, movernos por los hijos
    modal.firstElementChild.firstElementChild.setAttribute("src" , rutaImagen);

    //cambiamos el valor del figcaption con la primera opcion
    modal.querySelector("figcaption").innerHTML = pieImagen;

    modal.style.display = "flex";
}

/* cierra ventana modal */
function closeModal(figura) {
    console.log("funcion closeModal");
    // buscamos la ventana modal
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

//funcion para cambiar la opcaidad
function changeOpacity(){
    console.log("changeOpacity");

    //posicon del scroll en la qu estoy
    var scroll = window.scrollY;
    console.log("scroll: " + scroll);


    //posicion del scroll en la que esta el elemento menu
    //es el alto de la ventana menos el alto del menu
    var max_scroll = window.innerHeight - document.getElementById("menu").clientHeight;
    console.log("max_scroll: " + max_scroll);
    if (scroll <= max_scroll) {
        //calculamos el valor del alpha
        var opacity = scroll / max_scroll;
        console.log("opacidad: " + opacity);
        document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, " + opacity + ")";
    }
}

//detectamos el scroll con un callback
window.onscroll = function () {
    changeOpacity();
}