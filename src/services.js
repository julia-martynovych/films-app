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


// READ: method GET
function readFilm(){}
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

getOneFilm(4); 

// UPDATE: metod PUT
function updateFilm() {}

// DELETE: metod DELETE
// function deleteFilm() { }
async function deleteFilm(id, event) {  
    try {
        const response = await fetch(`http://localhost:3000/films/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error(`Error deleting film: ${response.status}`);
      
        event.target.closest("tr").remove();

        console.log(`Film ${id} deleted successfully`);
    } catch (error) {
        console.log("Error:", error);
    }
}




// PRINT
function printFilms() { }
// PRINT
async function printAllFilms() {
    let films = await getAllFilms();
    table.innerHTML = "";
    table.innerHTML = tableHead;
    films.forEach((film) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${film.id}</td>
            <td>${film.title}</td>
            <td>${film.year}</td>
            <td>${film.director}</td>
            <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
        `;
        row.querySelector(".delete-btn").addEventListener("click", (event) => deleteFilm(film.id, event));
        table.appendChild(row);
    });
}


// SEARCH: 
async function searchFilms() {
    try {
        const year = document.getElementById("year").value;
        const director = document.getElementById("director").value.toLowerCase();
        const title = document.getElementById("title").value.toLowerCase();

        let films = await getAllFilms();

      
        let filteredFilms = films.filter(film => {
            const matchesYear = year ? film.year == year : true;
            const matchesDirector = director ? film.director.toLowerCase().includes(director) : true;
            const matchesTitle = title ? film.title.toLowerCase().includes(title) : true;
            
            return matchesYear && matchesDirector && matchesTitle;
        });

      
        printFilms(filteredFilms);

    } catch (error) {
        console.log("Error:", error);
    }
}

function printFilms(films) {
    
    table.innerHTML = "";
    table.innerHTML = tableHead;

    
    if (films.length === 0) {
        table.insertAdjacentHTML("beforeend", "<tr><td colspan='4'>No films found</td></tr>");
        return;
    }

   
    films.forEach(film => {
        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${film.id}</td>
                <td>${film.title}</td>
                <td>${film.year}</td>
                <td>${film.director}</td>
            </tr>`
        );
    });
}



// New Film
async function addFilm() {
    const title = document.getElementById("addTitle").value.trim();
    const year = document.getElementById("addYear").value.trim();
    const director = document.getElementById("addDirector").value.trim();

    if (!title || !year || !director) {
        alert("Please fill all fields.");
        return;
    }

    const newFilm = { title, year, director };

    try {
        const response = await fetch("http://localhost:3000/films", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFilm),
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        alert("Film added successfully");

        // Add a new film
        const table = document.getElementById("films-table");
        table.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.year}</td>
                <td>${data.director}</td>
                <td><button class="delete-btn" onclick="deleteFilm(${data.id}, event)"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`
        );

        // Clean
        document.getElementById("addTitle").value = "";
        document.getElementById("addYear").value = "";
        document.getElementById("addDirector").value = "";

    } catch (error) {
        console.log("Error:", error);
    }
}

document.getElementById("addFilmButton").addEventListener("click", addFilm);



document.getElementById("showFormButton").addEventListener("click", function() {
    const form = document.getElementById("containerFormNewFilm");
    form.style.display = form.style.display === "none" ? "block" : "none";
});
