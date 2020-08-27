let thumbs = document.querySelectorAll('.thumbnail');
thumbs.forEach( (thumb) => {
    thumb.style.height = String(thumb.width * 9 / 16) + "px"
})