onLoad()

function onLoad() {

    // for adding authors
    let addAuthor = document.querySelector('.add-author');
    let author = document.querySelector('.author').firstElementChild;
    let del = author.getElementsByClassName('del-author')[0];
    authorDeletionListener(del);
    author = author.cloneNode(true);
    addAuthor.addEventListener('click', () => {
        createAuthor(author);
    })

    // for adding sections
    let addSection = document.querySelector('.add-section');
    let section = document.querySelector('.section');
    del = section.getElementsByClassName('del-section')[0];
    sectionDeletionListener(del);
    section = section.cloneNode(true);
    addSection.addEventListener('click', () => {
        createSection(section);
    })
}

function createAuthor(author) {
    let cln = author.cloneNode(true);
    document.querySelector('.author').appendChild(cln);
    let del = cln.getElementsByClassName('del-author')[0];
    authorDeletionListener(del);
    checkAuthorNumber();
}

function authorDeletionListener(del) {
    del.addEventListener('click', () => {
        document.querySelector('.author').removeChild(del.parentElement.parentElement);
        checkAuthorNumber();
    })
}

function checkAuthorNumber() {
    if (document.querySelector('.author').childElementCount > 1) {
        document.querySelectorAll('.del-author').forEach( (el) => {
            el.classList.remove('hide');
        })
    } else {
        document.querySelectorAll('.del-author').forEach( (el) => {
            el.classList.add('hide');
        })
    }
}

function createSection(section) {
    let cln = section.cloneNode(true);
    cln.style.display = "block";
    document.querySelector('.sections').appendChild(cln);
    let del = cln.getElementsByClassName('del-section')[0];
    let prev = cln.getElementsByClassName('preview')[0];
    sectionDeletionListener(del);
    sectionPreviewListener(prev, cln);
}

function sectionDeletionListener(del) {
    del.addEventListener('click', () => {
        document.querySelector('.sections').removeChild(del.parentElement)
    })
}

function sectionPreviewListener(prev, section) {
    prev.addEventListener('click', () => {
        let title = section.getElementsByClassName('section-title')[0].value;
        if (title === "") {
            title = "版块标题"
        }
        title = '<h2><i class="beer orange icon"></i> ' + title + '</h2><hr class="smooth">'
        let content = section.getElementsByClassName('section-content')[0].value;
        if (content === "") {
            content = "版块内容"
        }
        content = '<p>' + content.replace(/\n/g, "</p>\n<p>") + '</p>';
        let el = document.createElement('div');
        el.innerHTML = title + content;
        let preview = section.getElementsByClassName('section-preview')[0];
        // first clear preview
        while (preview.firstElementChild) {
            preview.removeChild(preview.firstElementChild);
        }
        // populate preview
        while(el.firstElementChild) {
            preview.appendChild(el.firstElementChild);
        }
    })
}