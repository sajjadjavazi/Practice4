let currentEntry = null;

document.getElementById('submit').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    if (title && description && date) {
        const entry = createEntryElement(title, description, date);
        document.getElementById('entries').appendChild(entry);
        clearForm();
    }
});

document.getElementById('update').addEventListener('click', function() {
    if (currentEntry) {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;

        currentEntry.querySelector('.entry-details h3').innerText = title;
        currentEntry.querySelector('.entry-details p').innerText = description;
        currentEntry.querySelector('.entry-date').innerText = date;

        clearForm();
        document.getElementById('submit').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        currentEntry = null;
    }
});

document.getElementById('sortOrder').addEventListener('change', function() {
    sortEntries(this.value);
});

function createEntryElement(title, description, date) {
    const entry = document.createElement('div');
    entry.className = 'entry';
    entry.innerHTML = `
        <div class="entry-details">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <div class="entry-date">${date}</div>
        <div class="entry-actions">
            <button class="edit">Edit</button>
            <button class="remove">Remove</button>
        </div>
    `;
    entry.addEventListener('click', function() {
        toggleExpand(entry);
    });
    entry.querySelector('.edit').addEventListener('click', function(event) {
        event.stopPropagation();
        editEntry(entry);
    });
    entry.querySelector('.remove').addEventListener('click', function(event) {
        event.stopPropagation();
        removeEntry(entry);
    });
    return entry;
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('update').style.display = 'none';
}

function toggleExpand(entry) {
    const expanded = document.querySelector('.expanded');
    if (expanded && expanded !== entry) {
        expanded.classList.remove('expanded');
    }
    entry.classList.toggle('expanded');
}

function editEntry(entry) {
    currentEntry = entry;
    document.getElementById('title').value = entry.querySelector('.entry-details h3').innerText;
    document.getElementById('description').value = entry.querySelector('.entry-details p').innerText;
    document.getElementById('date').value = entry.querySelector('.entry-date').innerText;

    document.getElementById('submit').style.display = 'none';
    document.getElementById('update').style.display = 'block';
}

function removeEntry(entry) {
    if (currentEntry === entry) {
        clearForm();
        currentEntry = null;
    }
    entry.remove();
    if (!document.querySelector('.entry')) {
        document.getElementById('submit').style.display = 'block';
        document.getElementById('update').style.display = 'none';
    }
}

function sortEntries(order) {
    const entriesContainer = document.getElementById('entries');
    const entries = Array.from(entriesContainer.getElementsByClassName('entry'));
    entries.sort((a, b) => {
        const dateA = new Date(a.querySelector('.entry-date').innerText);
        const dateB = new Date(b.querySelector('.entry-date').innerText);
        return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
    entriesContainer.innerHTML = '';
    entries.forEach(entry => entriesContainer.appendChild(entry));
}
