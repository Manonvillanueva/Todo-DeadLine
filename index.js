// => AJOUTER AU LOCAL STORAGE
const addLocalStorage = () => {
  // => Récupérer les données qui sont dans le local Storage ayant la key ("notes")
  let getNotes = localStorage.getItem("notes");
  // => Vérifier si il y a bien des données si oui .. sinon j'initialise un tableau vide
  let notesArray = getNotes ? JSON.parse(getNotes) : [];

  let note = {
    title: addTitle.value,
    description: textarea.value,
    date: dueDate.value,
  };

  notesArray.push(note);
  const noteString = JSON.stringify(notesArray);

  localStorage.setItem("notes", noteString);
};

//=> RECUPERER DU LOCAL STORAGE
const getStorage = () => {
  let dataNotes = localStorage.getItem("notes");
  let notesArr = dataNotes ? JSON.parse(dataNotes) : [];
  notesArr.forEach((data) => {
    toDoContainer.innerHTML += `<div id="toDoList">
    <div>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.date}</p>
    </div>
    <div id="iconPart">
    <i class="fa-solid fa-pencil"></i>
    <i class="fa-solid fa-trash" ></i>
    </div>
    </div>`;
  });
  const trashLogo = document.querySelectorAll(".fa-trash");
  trashLogo.forEach((trashBtn, data) => {
    trashBtn.addEventListener("click", (e) => {
      if (confirm("Etes-vous sûr(e) de vouloir supprimer cette note ?")) {
        notesArr.splice(data, 1);
        const notesStringify = JSON.stringify(notesArr);
        localStorage.setItem("notes", notesStringify);
        location.reload();
      }
    });
  });
};

const controle = () => {
  if (addTitle.value === "" || dueDate.value === "") {
    alert("Veuillez entrer un titre");
    e.preventDefault();
  } else {
    addLocalStorage();
  }
};

addNote.addEventListener("click", () => {
  const today = new Date().toISOString().split("T")[0];

  formContainer.innerHTML = `<form>
      <input id="addTitle" type="text" placeholder="Ajouter un titre"></input>
      <textarea id="textarea" placeholder="Ajouter une description"></textarea>
      <input id="dueDate" type="date" ></input>
      <div id="spaceBetween">
      <i class="fa-solid fa-rotate-left" id="returnBtn"></i>
      <button id="validBtn">Valider</button>
      </div>
    </form>`;

  dueDate.min = today;
  dueDate.value = today;

  validBtn.addEventListener("click", (e) => {
    e.preventDefault();
    controle();
    formContainer.innerHTML = "";
    location.reload();
  });

  returnBtn.addEventListener("click", () => {
    formContainer.innerHTML = "";
  });
});

window.onload = () => {
  getStorage();
};
