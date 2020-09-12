class work {
    _id;
    title = '';
    authors = [];
    description = '';
    imgCount = 0;
    category = ["无分类"];
    event = "无";
    download = {
        "link": "#",
        "key": ""
    };
    sections = [];
    password = "";
    constructor(
                title="无标题", authors=[], description="作者很懒，没有写简介", 
                imgCount = 0, category=["无分类"], event="无", download={"link":"#", "key":""}, 
                sections=this.sections, password=""
                ) {

        this.title = title;

        // ============================================ authors ============================================
        let auth = []
        if(typeof(authors.name) === "object" && authors.length !== 0) {
            authors.name.forEach( (name, index) => {
                let position = ''
                if (name === "") {
                    name = '无名'
                }
                if (authors.position[index] === "") {
                    position = '全能'
                } else {
                    position = authors.position[index]
                }
                auth.push({
                    "name": name,
                    "position": position
                });
            });
        } else {
            let name = authors.name
            let position = ''
            if (name === undefined || name === "") {
                name = '无名'
            }
            if (authors.position === undefined || authors.position === "") {
                position = '全能'
            } else {
                position = authors.position
            }
            auth.push({
                "name": name,
                "position": position
            })
        }
        this.authors = auth;
        // ============================================ authors ============================================

        this.description = description;
        this.imgCount = imgCount;
        this.category = category;
        this.event = event;
        this.download = download;

        // ============================================ sections ============================================
        let sec = []
        if (sections !== undefined && sections.length !== 0) {
            if(typeof(sections.title) === "object") {
                sections.title.forEach( (title, index) => {
                    let content = section.content[index]
                    content = sanitize(content);
                    if (title === "") {
                        title = "版块标题"
                    }
                    if (content === "") {
                        content = "版块内容"
                    }
                    sec.push({
                        "title": title,
                        "content": content
                    });
                });
            } else {
                if (sections.title === "") {
                    sections.title = "版块标题"
                }
                let content = sections.content
                if (content === "") {
                    content = "版块内容"
                }
                content = sanitize(content);
                sec.push({
                    "title": sections.title,
                    "content": content
                })
            }
        }
        this.sections = sec;
        // ============================================ sections ============================================

        this.password = password;
    }
}


function sanitize(text){
    var sanitized = text.replace("<script>", "");
    sanitized = sanitized.replace("</script>", "");
    return sanitized;
}

module.exports = work