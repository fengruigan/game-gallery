class work {
    id;
    title = '';
    authors = '';
    description = '';
    imgCount = 0;
    category;
    event;
    constructor(title="无标题", authors=[], description="作者很懒，没有写简介", imgCount = 0, category=["无分类"], event="无") {
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.imgCount = imgCount;
        this.category = category;
        this.event = event;
    }
}

module.exports = work