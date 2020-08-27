var db = require('./workDB.json'),
    dbManager = require('./dbManager'),
    work = require('./workSchema'),
    fs = require('fs');
const { stringify } = require('querystring');

// dbManager.create(new work("random title", ["no one"], "this one has a description"));
var newWork = new work(
    title="裂变",
    authors=["三思","曲未殇","油油","影子","罗德","健康大王"],
    description="这是一场天灾，还是人为，莉莉丝不清楚，她只知道她家的房子正在被巨型蚂蚁撕开口子，源源不断的蚂蚁从裂缝中涌入。玩家需要利用空投的物资，保护莉莉丝，just do it！",
    imgCount = 3,
    category=["塔防"],
    event="2020-CiGA",
)

// dbManager.create(new work());
// dbManager.destory("ebcaf39f-ffa2-45b1-b28f-b67729228323");
// dbManager.update("e7f86cf1-e768-4659-be49-57711fa559a4", newWork)
