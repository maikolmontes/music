document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrolNav();
}

//Navegacion
function navegacionFija() {
    const barra = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){        
        if( sobreFestival.getBoundingClientRect().top < 0){ //si ya pase el elemto toca la parte de arriba del elemento
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}


//efecto de scroll
function scrolNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault(); // quitando el evento por defecto algo asi
            
            //nuevo efecto
            const seccionScroll = e.target.attributes.href.value //accediendo al valor del href
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: 'smooth'});
        })
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
            console.log("..mostrando",imgindex);
        }
        galeria.appendChild(imagen);
    }
}  

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Boton cerrar la imagen
    const cerrarFoto = document.createElement('P');
    cerrarFoto.textContent= "X"
    cerrarFoto.classList.add('btn-cerrar');
    
    cerrarFoto.onclick= function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarFoto);

    //lo va añadir al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}