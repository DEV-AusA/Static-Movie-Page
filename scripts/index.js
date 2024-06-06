const { 
    fetchMovies,
    topRanked,
    sugeMovies
 } = require("./api");

const {
    cargarCardBanner,
    cargarCardMain,
    cargarCardTr,
    cargarCardBannerSuge,
    bntsNavHoverActive,
    rateColorMain,
    rateColorTr
} = require("./functions");

//creo una function para recibir la promesa del API y poder manipular los datos
estrenos = async () => {
    try {
        // espero la respuesta positiva de la promesa en fetchMovies
        const dataApi = await fetchMovies();
        const dataApiTR = await topRanked();
        const dataApiSuge = await sugeMovies();

        // data API 1
        const dataIndex = [];
        // data API 2
        const dataTopRank = [];
        // data API 3
        //const dataSuge = [];

        for (let i = 0; i < dataApi.length; i++) {

            let id = i;
            // destructuro valores de propiedades xq JS tiene problemas con nombres con _ como 'poster_path' y 'release_date'
            //const id = data[i]['id']; // uso una id propia
            const image = dataApi[i]['poster_path'];
            const imageBg = dataApi[i]['backdrop_path'];
            const title = dataApi[i]['title'];
            const year = dataApi[i]['release_date'];
            const overview = dataApi[i]['overview'];
            const rate = Math.floor(dataApi[i]['vote_average']*10);
    
            const poster = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+ image;
            const posterBg = 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces'+ imageBg;
            id++;
            const dataPura = {id, poster, posterBg, title, year, overview, rate};

            dataIndex.push(dataPura);                      
        }

        for (let i = 0; i < dataApiTR.length; i++) {

            let id = i;
            //const id = data[i]['id']; // uso una id propia
            const image = dataApiTR[i]['poster_path'];
            const imageBg = dataApiTR[i]['backdrop_path'];
            const title = dataApiTR[i]['title'];
            const year = dataApiTR[i]['release_date'];
            const overview = dataApiTR[i]['overview'];
            const rate = Math.floor(dataApiTR[i]['vote_average']*10);
    
            const poster = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+ image;
            const posterBg = 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces'+ imageBg;
            id++;
            const dataTR = {id, poster, posterBg, title, year, overview, rate};
            
            dataTopRank.push(dataTR);       
        }

        let id = 0;

        // index
        if (document.getElementById('body-index')) {
            
            dataIndex.forEach((movie) => cargarCardBanner(movie));
            dataIndex.forEach((movie) => cargarCardMain(movie));
            rateColorMain(); 
            buttonSendForm();
        }
        // topRank
        else if (document.getElementById('body-top-rank')) {
            dataTopRank.forEach((movie) => cargarCardTr(movie));
            rateColorTr();
            dataIndex.forEach((movie) => cargarCardMain(movie));
            rateColorMain();
            buttonSendForm();
        }
        // suge
        else if (document.getElementById('body-suge')) {
            dataApiSuge.forEach((movie) => {
                id++;
                movie.id = id;
                cargarCardBannerSuge(movie);
            });
            dataIndex.forEach((movie) => cargarCardMain(movie));
            rateColorMain();
            buttonSendForm();
        }
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const cleanInputs = () => {

    //limpiar intups
    const inputsForm = document.querySelectorAll('.form-control');
    inputsForm.forEach((input) => {
        input.value = '';
    });
    // limpiar selects
    const selectsForm = document.querySelectorAll('.form-select');
    selectsForm.forEach((select) => {
        select.selectedIndex = 0;
    });
    // desmarcar checkboxes
    const checkboxesForm = document.querySelectorAll('.form-check-input');
    checkboxesForm.forEach((checkbox) => {
        checkbox.checked = false;
    });
};

const validateForm = (event) => {

    event.preventDefault(); // Evita el envio del formulario por defecto debido al button de type=submit
    const form = document.querySelector('.needs-validation'); 
    // Agregar la clase 'was-validated' al formulario
    form.classList.add('was-validated'); 

    // Verifico si el formulario cumple con ciertas condiciones enviar los datos
    if (form.checkValidity() && form.querySelectorAll(':invalid').length === 0) {
        
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        const errorMessage = document.getElementById('error-message');

        if (email === '' || password === '') {
            errorMessage.textContent = 'Todos los campos son obligatorios.';
            errorMessage.style.display = 'block';
            return;
        } else {
             // cierro modal si todo esta ok
             const loginModal = document.getElementById('loginUserModal');
             let modal = bootstrap.Modal.getInstance(loginModal);
             modal.hide();
             alert('Login Correcto');

             // redirigo
             window.location.href = 'https://dev-ausa.github.io/Pagina-Peliculas-mas-Play';
        }

        // limpio inputs despues de enviar
        cleanInputs();
        //remuevo la clase was-validated
        form.classList.remove('was-validated');
        
        // DATOS DE LOGIN
        console.log({email, password});
    }
};

const buttonSendForm = () =>{
    const btnSendform = document.getElementById('send-button-form');
    btnSendform.addEventListener('click', validateForm);
    // con esto prevengo que el btn submit deje capturar el contenido de todos los inputs y evitar que no se capture el primero input
};

estrenos();
bntsNavHoverActive();

