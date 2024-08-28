// => AJOUTER AU LOCAL STORAGE
const addLocalStorage = () => {
  // => Récupérer les données qui sont dans le local Storage ayant la key ("notes")
  let getNotes = localStorage.getItem("notes");
  // => Initialise notesArray avec les notes récupérées depuis getNotes, ou avec un tableau vide si aucunes notes est diponible dans getNotes .
  let notesArray = getNotes ? JSON.parse(getNotes) : [];
  // => Création d'un objet avec les valeurs mis dans les champs du formulaire
  let note = {
    title: addTitle.value,
    description: textarea.value,
    date: dueDate.value,
  };
  // => Ajoute la note dans mon tableau notesArray
  notesArray.push(note);
  // => Pour pouvoir l'ajouter au localStorage il faut utiliser stringify() car on peut seulement enregistrer des strings dans le localStorage
  const noteString = JSON.stringify(notesArray);
  // => Met à jour le localStorage (clé,valeur)
  localStorage.setItem("notes", noteString);
};

//=> RECUPERER DU LOCAL STORAGE
const getStorage = () => {
  // => Récupérer mes notes dans le localStorage ayant la key "notes"
  let dataNotes = localStorage.getItem("notes");
  // => Initialise dataNotesArr avec les notes récupérees depuis dataNotes ou avec un tableau vide si aucunes notes est dispo
  let dataNotesArr = dataNotes ? JSON.parse(dataNotes) : [];
  // => En parcourant chaque élément de mon tableau dataNotesArr , je créee un bloc HTML avec les propriétes title, description et date de chaque note qui est ajouté dans mon main "toDoContainer"
  // => IMPORTANT , utiliser += afin de pouvoir ajouter une note sans écraser la précédente
  dataNotesArr.forEach((data) => {
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

  // => MODIFIER DU LOCAL STORAGE
  const penLogo = document.querySelectorAll(".fa-pencil");
  penLogo.forEach((penBtn, index) => {
    // => Récupérer les données de la note correspondante via l'index
    let noteToModify = dataNotesArr[index];
    penBtn.addEventListener("click", () => {
      formContainer.innerHTML = `<form>
      <input id="titleToModify" type="text" value="${noteToModify.title}"></input>
      <textarea id="descriptionToModify" placeholder="Ajouter une description">${noteToModify.description}</textarea>
      <input id="dateToModify" type="date" value="${noteToModify.date}"></input>
      <div id="spaceBetween">
      <i class="fa-solid fa-rotate-left" id="returnBtn"></i>
      <button id="modifyBtn">Modifier</button>
      </div>
    </form>`;

      returnBtn.addEventListener("click", () => {
        formContainer.innerHTML = "";
      });

      modifyBtn.addEventListener("click", () => {
        if (titleToModify.value == "" || dateToModify.value == "") {
          alert("Veuillez entrer un titre");
        } else {
          dataNotesArr[index].title = titleToModify.value;
          dataNotesArr[index].description = descriptionToModify.value;
          dataNotesArr[index].date = dateToModify.value;
          localStorage.setItem("notes", JSON.stringify(dataNotesArr));
        }
      });
    });
  });

  // => SUPPRIMER DU LOCAL STORAGE
  const trashLogo = document.querySelectorAll(".fa-trash");
  trashLogo.forEach((trashBtn, data) => {
    trashBtn.addEventListener("click", () => {
      if (confirm("Etes-vous sûr(e) de vouloir supprimer cette note ?")) {
        dataNotesArr.splice(data, 1);
        const notesStringify = JSON.stringify(dataNotesArr);
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
