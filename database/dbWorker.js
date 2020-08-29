var db = require('./workDB.json'),
    dbManager = require('./dbManager'),
    work = require('./workSchema'),
    fs = require('fs');
const { stringify } = require('querystring');

// dbManager.create(new work("random title", ["no one"], "this one has a description"));
var newWork = new work(
    "You'll Never Get Any Gold",
    [
        "legendsmb"
    ],
    "主人公是一个机器人，它为了防止人类不断的开采自然资源，因此打算收集这些自然资源把它们运往地底深处防止被人类开采到。",
    3,
    [
        "无分类"
    ],
    "2020-CiGA"
)

// dbManager.create(newWork);
// dbManager.destory("134a6835-2642-412f-a1d1-22f59b31dbd0");
// dbManager.update("5f8e7712-e877-49a2-89f8-b3a67d180e68", newWork)
