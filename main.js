// async function getFilms() {
//     const response = await fetch("http://localhost:3000/films");
//     const data = await response.json();
//     return data;
// }

// async function postFilms(newFilm) {
//     const response = await fetch("http://localhost:3000/films",
//         {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(newFilm)
//         }
//     );
//     const data = await response.json();
//     return data;
// }

// async function updateFilms(newFilm, id) {
//     const response = await fetch(`http://localhost:3000/films/${id}`,
//         {
//             method: "PUT",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(newFilm)
//         }
//     );
//     const data = await response.json();
//     return data;
// }

// async function updateFilms(id) {
//     const response = await fetch(`http://localhost:3000/films/${id}`,
//         {
//             method: "DELETE",
//             headers: {"Content-Type": "application/json"}
//         }
//     );
//     const data = await response.json();
//     return data;
// }