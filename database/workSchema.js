class work {
    title = '';
    authors = '';
    description = '';
    category;
    constructor(title="无标题", authors=[], description="作者很懒，没有写简介", category="无分类", new_attr="null") {
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.category = category;
    }
}

module.exports = work