var db = require('./workDB.json'),
    dbManager = require('./dbManager'),
    work = require('./workSchema'),
    fs = require('fs');
const { stringify } = require('querystring');

// dbManager.create(new work("random title", ["no one"], "this one has a description"));
var newWork = new work(
    "SEEK",
    [
        "Mr_porridge","风铭言","阿九阿尔法","Xbrain"
    ],
    "蚂蚁，快递，破碎的镜子，抽屉，相册，天窗，裂缝，门，抑郁症发作药物服用后的蚁走感，意象的世界。他们发不出声，只能隔着牢笼看外面的世界，有时候也不是他们不想离开，牢笼有时候就是自己，活到最后就如同一个提线木偶。脱轨的世界，割离的外界，唯有那些能唤醒自己的美好记忆的箱子，打开心灵宝箱的钥匙。追随她的身影，世界从黑白变成彩色，从木偶变成人，从心境到现实，找回真实的自我。",
    4,
    [
        "解谜"
    ],
    "2020-CiGA"
)

// dbManager.create(newWork);
// dbManager.destory("134a6835-2642-412f-a1d1-22f59b31dbd0");
// dbManager.update("bff3e771-6083-4b4a-9413-34e79c539558", newWork)
