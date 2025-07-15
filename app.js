var notes = [];

// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", event => {
    renderNotes();
 
    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        const note = document.querySelector("textarea").value;
        if (note.length==0) {
            alert("You didn't input any content");
        } else {
            notes.push(note);
            renderNotes();
            document.querySelector("textarea").value = "";
        }
    });

    document.querySelector("#btnLearn").addEventListener("click", event => {
        location.href = "https://frontendmasters.com";
    });

    document.getElementById("btnInstall").addEventListener("click", event => {
        if (bipEvent) {
            bipEvent.prompt();
        } else {
            alert("Sorry, you can't install the app right now.");
        }
    })
})

let bipEvent = null;

window.addEventListener("beforeinstallprompt", event => {
    document.querySelector("#btnInstall").hidden = false;
    event.preventDefault();
    bipEvent = event;
});

// Render the notes on the DOM
function renderNotes() {
    const ul = document.querySelector("#notes");
    ul.innerHTML = "";
    notes.forEach( (note, index) => {
        // Create the note LI
        const li = document.createElement("li");
        li.innerHTML = note;
        // Delete element for each note
        const deleteButton = document.createElement("a");
        deleteButton.innerHTML = '<span class="icon">delete</span>';
        deleteButton.addEventListener("click", event => {
            if (confirm("Do you want to delete this note?")) {
                notes.splice(index, 1);
                renderNotes();
            }
        });
        li.appendChild(deleteButton);
        ul.appendChild(li);
    })
}
