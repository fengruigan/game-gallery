// var imageManager = require('../../manager/imageManager.json')
// var db = require('../../database/workDB.json')
var dbManager = require('../database/dbManager')


// ========================= BELOW ARE WORKING SCRIPTS

$(document).ready( () => {

    resizeImg();
    $('.ui.card').click((param) => {
        $("#detail").fadeOut(50);
        var target = param.currentTarget;
        $(target).after($("#detail"));
        $("#detail").fadeIn();
        // $(target)
    })

    let work = dbManager.read("e7f86cf1-e768-4659-be49-57711fa559a4");
    let arr = $.map(work.authors, (author) => {
        return [author]
    })
    console.log(arr)
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
    $('#author').text(Array.toString(work.author));
    $('#description').text(work.description)
}