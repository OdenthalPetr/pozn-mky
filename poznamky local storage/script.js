document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('noteInput');
    const saveButton = document.getElementById('saveButton');
    const notesList = document.getElementById('notesList');
  
    saveButton.addEventListener('click', function() {
      const noteText = noteInput.value.trim();
      if (noteText !== '') {
        saveNoteToLocalStorage(noteText);
        renderNotes();
        noteInput.value = '';
      } else {
        alert('Please write something before saving.');
      }
    });
  
    notesList.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit')) {
        const noteId = event.target.dataset.id;
        const updatedNoteText = prompt('Edit your note:', event.target.parentElement.querySelector('.note-text').innerText);
        if (updatedNoteText !== null) {
          updateNoteInLocalStorage(noteId, updatedNoteText);
          renderNotes();
        }
      } else if (event.target.classList.contains('delete')) {
        const noteId = event.target.dataset.id;
        deleteNoteFromLocalStorage(noteId);
        renderNotes();
      }
    });
  
    function saveNoteToLocalStorage(noteText) {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      const timestamp = new Date().toISOString();
      notes.push({ id: generateId(), text: noteText, timestamp: timestamp });
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function updateNoteInLocalStorage(noteId, updatedNoteText) {
      const notes = JSON.parse(localStorage.getItem('notes'));
      const noteIndex = notes.findIndex(note => note.id === noteId);
      notes[noteIndex].text = updatedNoteText;
      notes[noteIndex].timestamp = new Date().toISOString();
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function deleteNoteFromLocalStorage(noteId) {
      const notes = JSON.parse(localStorage.getItem('notes'));
      const filteredNotes = notes.filter(note => note.id !== noteId);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
    }
  
    function generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    function renderNotes() {
      notesList.innerHTML = '';
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
          <p class="note-text">${note.text}</p>
          <p class="note-timestamp">Created/Updated: ${new Date(note.timestamp).toLocaleString()}</p>
          <button class="edit" data-id="${note.id}">Upravit</button>
          <button class="delete" data-id="${note.id}">Vymazat</button>
        `;
        notesList.appendChild(noteElement);
      });
    }
  
    renderNotes();
  });
  