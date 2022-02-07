/*-CREATE SERVER-*/
const express = require('express'),
    app = express();
app.listen(1002, () => {
    console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：1002!!`);
});

// 代理
const request = require('request');
app.get('/subscriptions/recommended_collections', function (req, res) {
    let url = 'https://www.jianshu.com/asimov' + req.url;
    req.pipe(request(url)).pipe(res);
});
app.use(express.static('./'));