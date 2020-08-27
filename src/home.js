// var imageManager = require('../../manager/imageManager.json')
// var db = require('../../database/workDB.json')
var dbManager = require('../database/dbManager'),
    fs = require('fs');

// ========================= BELOW ARE WORKING SCRIPTS

$(document).ready( () => {

    resizeImg();
    $('.ui.card').click((param) => {
        $("#detail").hide();
        var target = param.currentTarget;
        $(target).parent().after($("#detail"));
        $("#detail").fadeIn(400);
        populateDetail(target.id);
    })
})

$(window).resize( () => {
    resizeImg();
})

function resizeImg() {
    $('.thumbnail').height($('.thumbnail').width() * 9 / 16)
    $('.ui.placeholder').height($('.ui.placeholder').width() * 9 / 16)
};

function populateDetail(id) {
    let work = dbManager.read(id);
    $('#title').text(work.title);
    let authors = work.authors.join();
    if (authors !== ""){
        $('#author').text(authors);
    } else {
        $('#author').text('作者没有留下名字');
    }
    $('#description').text(work.description);
    $('#link').attr("href", "/works/" + id);

    $('.list').empty();
    for (let i = 1; i <= Math.min(work.imgCount, 4); i++) {
        let imgUrl = id + "/images/" + String(i) + ".png";
        let cls = "";
        if (i === 1) {
            cls = "class='active'"
        } else {
            cls = ""
        }
        let li = "<li " + cls + "><img src='"+imgUrl+"'></li>";
        $(".list").append(li);
    }
    changeShowcase();
    $('li').click( (param) => {
        $('li').removeClass("active");
        param.currentTarget.classList.add("active");
        changeShowcase();
    })
}

function changeShowcase() {
    let url = $('.active img').attr('src');
    $('.showcase img').attr('src', url);
}