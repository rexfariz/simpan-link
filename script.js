const linkCategory = document.querySelector("#linkCategory");
const submitButton = document.querySelector("#submitButton");
const addButton = document.querySelector("#addButton");
const cancelButton = document.querySelector("#cancelButton");
const addLinkPanel = document.querySelector("#addLinkPanel");
const linkList = document.querySelector("#linkList");
const addCategory = document.querySelector("#addCategory");
const addLinkContainer = document.querySelector("#addLinkContainer");

let editIndex = -1;
let linkCategories = [];
let links = [{
        title: 'rexfariz',
        url: 'https://www.github.com/rexfariz',
        categories: ['Beginner'],
        date: new Date()
    },
    {
        title: 'Digital Talent Scholarship',
        url: 'https://digitalent.kominfo.go.id/',
        categories: ['Online Academy Batch 2'],
        date: new Date()
    },
    {
        title: 'Progate',
        url: 'https://www.progate.com/',
        categories: ['Platform designed to help me learn coding'],
        date: new Date()
    },
    {
        title: 'Core Fundamentals',
        url: 'https://www.youtube.com/playlist?list=PLDlWc9AfQBfaO1IX02_1L5MW2s9RyIgQ7',
        categories: ['James Q. Quick', 'HTML', 'CSS', 'Javascript'],
        date: new Date()
    }
];

displayLinks();

addButton.addEventListener('click', (evenutto) => {
    console.log("Tambah link");

    showFormPanel();
});

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("Batal");

    hideFormPanel();
});

function showFormPanel() {
    addLinkContainer.classList.remove('hidden');

    displayLinkCategories();
}

function hideFormPanel() {
    addLinkContainer.classList.add('hidden');

    clearLinkForm();
}

linkCategory.addEventListener('keydown', function(event) {

    if (event.keyCode === 188) {
        event.preventDefault();
        console.log(",");

        linkCategories.push(linkCategory.value);

        linkCategory.value = '';

        displayLinkCategories();
    }
});

function displayLinkCategories() {
    addCategory.innerHTML = '';
    for (let category of linkCategories) {
        let categoryHTMLString = `<span class="category">${category}</span>`;
        addCategory.innerHTML += categoryHTMLString;
    }
}

function clearLinkForm() {
    linkTitle.value = '';
    linkUrl.value = '';
    linkCategory.value = '';
    linkCategories = [];
    addCategory.innerHTML = '';
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("Simpan link");

    const title = linkTitle.value;
    const url = linkUrl.value;
    const categories = linkCategories;
    const newLink = {
        title,
        url,
        categories,
        date: new Date()
    };

    if (editIndex === -1) {
        links.unshift(newLink);
    } else {
        links[editIndex] = newLink;
        editIndex = -1;
    }

    clearLinkForm();

    displayLinkCategories();

    hideFormPanel();

    displayLinks();
});

function displayLinks() {
    linkList.innerHTML = '';

    let index = 0;
    for (let link of links) {

        let linkHTMLString = `
        <div class="flex-item">
            <div class="link panel">
                <div class="link-options">
                    <button class="btn-small" onclick="deleteLink(${index})">Hapus</button>
                    <button class="btn-small" onclick="editLink(${index})">Ubah</button>
                </div>

                <a href="${link.url}" target="_blank">
                    <h1 class="header">${link.title}</h1>
                </a>
                <p class="link-date">${formatDate(link.date)}</p>

                <div class="categories">
                    Kategori:
        `;

        for (let category of link.categories) {
            linkHTMLString += `<span class="category">${category}</span>`;
        }

        linkHTMLString += `
                </div> 
            </div>
        </div>
        `;

        linkList.innerHTML += linkHTMLString;
        index++;
    }
}

function deleteLink(index) {
    console.log("Hapus link");

    links.splice(index, 1);

    displayLinks();
}

function editLink(index) {
    console.log("Ubah link");

    editIndex = index;
    linkTitle.value = links[index].title;
    linkUrl.value = links[index].url;
    linkCategories.value = links[index].categories;

    showFormPanel();
}

function formatDate(date) {
    return `${("0" + date.getDay()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}