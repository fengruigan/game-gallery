var dbManager = require('../database/dbManager'),
    fs = require('fs');

// ========================= BELOW ARE WORKING SCRIPTS

onLoad()

function onLoad() {
    resizeImg();
    let cards = document.querySelectorAll('.ui.card');
    cards.forEach( (card) => {
        card.addEventListener('click', (param) => {
            let detail = document.querySelector('#detail');
            detail.style.display = "none";
            let target = param.currentTarget;
            let parent = target.parentElement;
            populateDetail(target.id);
            parent.after(detail);
            detail.style.display = "block";
        })
    })

    // $('.ui.card').on('tap', (param) => {
    //     $("#detail").hide();
    //     var target = param.currentTarget;
    //     $(target).parent().after($("#detail"));
    //     $("#detail").fadeIn(400);
    //     populateDetail(target.id);
    // })
    // $('.ui.card').on('click', (param) => {
    //     $("#detail").hide();
    //     var target = param.currentTarget;
    //     $(target).parent().after($("#detail"));
    //     $("#detail").fadeIn(400);
    //     populateDetail(target.id);
    // })

    window.addEventListener('resize', () => {
        resizeImg();
    })
}

function resizeImg() {

    let thumbs = document.querySelectorAll('.thumbnail');
    thumbs.forEach( (thumb) => {
        thumb.style.height = String(thumb.width * 9 / 16) + "px"
    })
    
    // $('.thumbnail').height($('.thumbnail').width() * 9 / 16)
    // $('.ui.placeholder').height($('.ui.placeholder').width() * 9 / 16)
};

function populateDetail(id) {
    let work = dbManager.read(id);
    // $('#title').text(work.title);
    document.querySelector('#title').textContent = work.title
    let authors = work.authors.join();
    let author_field = document.querySelector('#author')
    if (authors !== ""){
        author_field.textContent = authors;
    } else {
        author_field.textContent = '作者没有留下名字';
    }
    document.querySelector('#description').textContent = work.description
    document.querySelector('#link').attributes.href.value = "/works/" + id;

    $('#list').empty();
    for (let i = 1; i <= Math.min(work.imgCount, 4); i++) {
        let imgUrl = id + "/images/" + String(i) + ".png";
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
    // $('li').on('tap', (param) => {
    //     $('li').removeClass("active");
    //     param.currentTarget.classList.add("active");
    //     changeShowcase();
    // })
}

function changeShowcase() {
    let url = document.querySelector('.active img').attributes.src.value
    document.querySelector('.showcase img').attributes.src.value = url
}