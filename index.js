// --- > OPEN & CREATE THE FORM
const controle = (e) => {
  if (addTitle.value === "" || dueDate.value === "") {
    alert("Veuillez entrer un titre et une date limite");
  } else {
    const titleValue = addTitle.value;
    const textareaValue = textarea.value;
    const dateValue = dueDate.value;
    console.log(textareaValue);
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
  });

  returnBtn.addEventListener("click", () => {
    formContainer.innerHTML = "";
  });
});
