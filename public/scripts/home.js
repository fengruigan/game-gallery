onLoad()

function onLoad() {
    resizeImg();
    let cards = document.querySelectorAll('.ui.card');
    cards.forEach( (card) => {
        let data = {
            "id": card.id, 
            "title": card.dataset.title,
            "authors": card.dataset.authors,
            "description": card.dataset.description,
            "imgCount": card.dataset.imgcount,
        }
        card.addEventListener('click', (param) => {
            let detail = document.querySelector('#detail');
            // detail.style.display = "none";
            let target = param.currentTarget;
            let parent = target.parentElement;
            populateDetail(data);
            parent.after(detail);
            if (detail.dataset.displaying === target.id) {
                detail.classList.toggle('hide');
            } else {
                detail.classList.remove('hide');
            }
            detail.dataset.displaying = target.id
        })
    })

    window.addEventListener('resize', () => {
        resizeImg();
    })
}

function resizeImg() {
    let thumbs = document.querySelectorAll('.thumbnail');
    thumbs.forEach( (thumb) => {
        thumb.style.height = String(thumb.width * 9 / 16) + "px"
    })
    let showcase = document.querySelector('#showcase');
    showcase.style.height = String(showcase.width * 9 / 16) + "px"
};

function populateDetail(data) {
    let work = data
    document.querySelector('#title').textContent = work.title
    document.querySelector('#author').textContent = work.authors;
    document.querySelector('#description').textContent = work.description
    document.querySelector('#link').attributes.href.value = "/works/" + work.id;

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    if (work.imgCount != 0) {
        for (let i = 1; i <= Math.min(work.imgCount, 4); i++) {
            let imgUrl = "https://indie-gallery-app.imfast.io/" + work.id + "/images/" + String(i) + ".png";
            let li = document.createElement('li');
            let img = document.createElement('img')
            img.src= imgUrl;
            li.appendChild(img)
            li.classList.add('listItem')
            if(i === 1) {
                li.classList.add('active');
            }
            document.querySelector('#list').appendChild(li)
        }
    } else {
        let imgUrl = "/images/placeholder.png";
        let li = document.createElement('li');
        let img = document.createElement('img')
        img.src= imgUrl;
        li.appendChild(img)
        li.classList.add('listItem', 'active')
        document.querySelector('#list').appendChild(li)
    }

    changeShowcase();
    let lis = document.querySelectorAll('.listItem')
    lis.forEach( (li) => {
        li.addEventListener('click', (param) => {
            lis.forEach( (li) => {
                li.classList.remove('active')
            })
            param.currentTarget.classList.add('active');
            changeShowcase();
        })
    })
}

function changeShowcase() {
    resizeImg();
    let url = document.querySelector('.active img').attributes.src.value
    document.querySelector('#showcase').attributes.src.value = url
}