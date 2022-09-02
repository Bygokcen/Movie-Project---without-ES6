const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//UI object START
const ui=new UI();
//STTORAGE CREAATE
const storage= new Storage();
//Eventler

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);

    clear.addEventListener("click",clearAll);

}

function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title === "" || director === "" ||url ==="" ){
        //HATA
        ui.displayMessages("Tüm alanları doldurun...","danger");
    }else{
        //yeni film
        const newFilm= new Film(title,director,url);
        
        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);//Storage upload
        ui.displayMessages(`${title} Eklendi !`,"success");

    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme İşlemi başarılı","success");
    }
}

function clearAll(){
    if(confirm("Emin misin ?")){
    ui.clearAllFromUI();
    storage.clearAllFromStorage();
    }
}