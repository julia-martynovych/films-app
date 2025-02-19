const table = document.getElementById("films-table");
const tableHead = document.getElementById("films-table").outerHTML;

// CREATE: metod POST
function createFilms() { }
async function addFilm(film) {
    try {
        
        // Get all films from the server
        let films = await getAllFilms();

        // Check if the film already exists
        let filmExists = films.some(f => f.title === film.title && f.year === film.year);
        if (filmExists) {
            console.log("The film already exists");
            return;
        }

        // If the film doesn't exist, add it
        let response = await fetch("http://localhost:3000/films", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(film)
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        console.log("Film added successfully");
    } catch (error) {
        console.log("Error:", error);
    }
}

// Example usage:
// addFilm({ title: "New Movie", year: 2024, director: "Someone" });
addFilm({ title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino" });


// READ: metod GET
// function getAllFilms() {

//     // necesitamos el asyn await metodo fetch y lo muetre por consola
// }
getAllFilms()
// async function getAllFilms(){
//     try {
//         let promesa = await fetch("http://localhost:3000/films");
//         let respuesta = await promesa.json();
//         console.log(respuesta);
//     } catch (error) {
//         console.log("Error", error);
// }
// }

// async function simpleGet() {
//     const response = await fetch("http://localhost:3000/films", {
//         method: "GET",
//         headers: {
//             "Content-Type":"application/json",
//         },
//     }); 
//     const data = await response.json();
//     console.log(data);
// }
// simpleGet();

async function getAllFilms(){
    try {
        let response = await fetch("http://localhost:3000/films");
        let data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
}
async function simpleGet() {
    let response = await fetch("http://localhost:3000/films");
        let data = await response.json();
        return data;
}
    
function getOneFilm() {
    
}
// async function getOneFilm(id) {
//     try {
//         let response = await fetch(`http://localhost:3000/films/${id}`);
//         let film = await response.json();
//         console.log(film);
//     } catch (error) {
//         console.log("Error:", error);
//     }
// }
async function getOneFilm(id) {
    try {
        let response = await fetch(`http://localhost:3000/films/${id}`);
        if (!response.ok) throw new Error(`Error HTTP: ${ response.status}`);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error:", error);
    }
}

getOneFilm(2); 

// UPDATE: metod PUT
function updateFilm() {
    
}

// DELETE: metod DELETE
function deleteFilm() {
    
}
// async function deleteFilm(id) {
//     try {
//         const response = await fetch(`http://localhost:3000/films/${id}`, {
//             method: "DELETE",  
//         });

//         if (response.ok) { 
//             console.log(`Фильм с ID ${id} успешно удалён`);
//         } else {
//             console.log("Не удалось удалить фильм");
//         }
//     } catch (error) {
//         console.log("Ошибка:", error);
//     }
// }

// Пример использования:
// deleteFilm(1); // Удалим фильм с ID = 1

// PRINT
function printFilms() { }
// PRINT
async function printAllFilms() {
    let films = await getAllFilms();
    table.innerHTML = "";
    table.innerHTML = tableHead;
    films.forEach((film) => {
        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
            <td>${film.id}</td>
            <td>${film.title}</td>
            <td>${film.year}</td>
            <td>${film.director}</td>
            </tr>`
        )
    }
        )
}