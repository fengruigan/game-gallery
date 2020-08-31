onLoad()

function onLoad() {
    console.log('script loaded')
    resizeImg();
    generateList();

    window.addEventListener('resize', () => {
        resizeImg();
    })
}

function resizeImg() {
    let showcase = document.querySelector('#showcase');
    showcase.style.height = String(showcase.width * 9 / 16) + "px"
};

function generateList() {
    let id = document.querySelector('#list').dataset.id
    let imgCount = document.querySelector('#list').dataset.imgcount

    for (let i = 1; i <= imgCount; i++) {
        let imgUrl = "/" + id + "/images/" + String(i) + ".png";
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