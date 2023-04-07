// function tarea(collback){
//     console.log("mi primer tarea");     
//     
//      collback(); //significa que termino de ejecutarse la funrion de tarea  
// }

// //node llamar funtion
// exports.tarea = tarea;

// //llamar node funtion desde terminal
//     //npx gulp nombreaejecutar  




//LLAMAR SASS DESDE GULP
//importacions 
const {src, dest, watch, parallel} = require("gulp") //extraer funcionalidades de gulp, src identificar,dest almacenar,watch no ejecutar comando a cada rato
// CSS
const sass = require('gulp-sass')(require('sass')); //busca todas las dependencias de sass
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes comvertir a webp
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const webp = require('gulp-webp'); //extraemos la funcion
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser');


function css(done){    
    src("src/scss/**/*.scss")    // Identificar el archivo de SASS // todos los archivos de sass
    .pipe(sourcemaps.init()) //guia para encontrar el archivo de SASS
    .pipe(plumber()) // Que no nos pare la ejecucion si tenemos un error
    .pipe( sass() )            //  COMPILARLO
    .pipe(postcss([autoprefixer(),cssnano()])) //mejora el css
    .pipe(sourcemaps.write("."))
    .pipe( dest("build/css")) //   ALMACENARLA EN EL DISCO DURO

    
    done(); //avisa a gulp cuando llegamos al final
}

function imagenes(done){
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img')) //alacenando

    done();
}

function versionWebp(done){
    const options = { //objeto
        quality: 50 //modificando la img
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(options))
        .pipe(dest('build/img')) //alacenando
    done(); 
}
function versionAvif(done){
    const options = { //objeto
        quality: 50 //modificando la img
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(options))
        .pipe(dest('build/img')) //alacenando
    done(); 
}

function javascript(done){
    src('src/js/**/*.js') // busca todos los archivos que terminen en js
    .pipe( terser() )
    .pipe(dest('build/js'));
    done();
}

function dev(done){
    watch("src/scss/**/*.scss",css) //los cambias que realiza al archivo , carga la hoja de estilos y usa la funcion css
    watch("src/js/**/*.js",javascript) //los cambias que realiza al archivo , carga la hoja de estilos y usa la funcion javascript
    done(); 
}

//node llamar funtion
exports.css = css;
exports.javascript = javascript;
exports.imagenes  = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (imagenes, versionWebp,versionAvif,javascript, dev) ;