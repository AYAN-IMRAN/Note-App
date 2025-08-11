let title = document.querySelector("#title");
let description = document.querySelector("#description");
let addNote = document.querySelector("#add-note");
let rightSide = document.querySelector(".right-side");

// Load notes from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(note => createNoteElement(note.title, note.description, note.bgColor));
});

// Create note element function
function createNoteElement(titleText, descriptionText, bgColor = "white") {
  let note = document.createElement("div");
  note.classList.add("note");
  note.style.backgroundColor = bgColor;

  note.innerHTML = `
    <div class="note-left">
      <h2 class="title">${titleText}</h2>
      <p class="description">${descriptionText}</p>
    </div>
    <div class="note-right">
      <div class="note-right-top">
        <div class="colors" id="lightblue" style="background-color: lightblue"></div>
        <div class="colors" id="lightcoral" style="background-color: lightcoral"></div>
        <div class="colors" id="lightgreen" style="background-color: lightgreen"></div>
        <div class="colors" id="lightslategray" style="background-color: lightslategray"></div>
      </div>
      <div class="note-right-bottom">
        <svg class="delete-btn" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21
             c.342.052.682.107 1.022.166m-1.022-.165L18.16
             19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25
             2.25 0 0 1-2.244-2.077L4.772 5.79m14.456
             0a48.108 48.108 0 0 0-3.478-.397m-12
             .562c.34-.059.68-.114 1.022-.165m0
             0a48.11 48.11 0 0 1 3.478-.397m7.5
             0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
             51.964 0 0 0-3.32 0c-1.18.037-2.09
             1.022-2.09 2.201v.916m7.5 0a48.667
             48.667 0 0 0-7.5 0" />
        </svg>
      </div>
    </div>
  `;

  // Append to DOM
  rightSide.appendChild(note);

  // Setup color changer
  note.querySelectorAll(".colors").forEach(singleBtn => {
    singleBtn.addEventListener("click", () => {
      note.style.backgroundColor = singleBtn.id;
      updateLocalStorage(); // Save color change
    });
  });

  // Setup delete button
  note.querySelector(".delete-btn").addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

// Add new note event
addNote.addEventListener("click", () => {
  const titleText = title.value.trim();
  const descriptionText = description.value.trim();
  if (!titleText && !descriptionText) return;

  createNoteElement(titleText, descriptionText);
  title.value = "";
  description.value = "";
});

// Save all current notes to localStorage
function updateLocalStorage() {
  const allNotes = [];
  document.querySelectorAll(".note").forEach(note => {
    const title = note.querySelector("h2").innerText;
    const description = note.querySelector("p").innerText;
    const bgColor = note.style.backgroundColor || "white";
    allNotes.push({ title, description, bgColor });
  });
  localStorage.setItem("notes", JSON.stringify(allNotes));
}
