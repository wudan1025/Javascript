/*-CREATE SERVER-*/
const express = require('express'),
	app = express();
app.listen(1001, () => {
	console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：1001`);
});

/*-MIDDLE WARE-*/
// CORS：服务器允许当前客户端发请求
const safeList = ["http://127.0.0.1:5500", "http://127.0.0.1:1001"];
app.use((req, res, next) => {
	/*
	 * Allow-Origin：
	 *   + 单一源
	 *   + * 所有源「但是此时不安全，而且不允许携带资源凭证」
	 * 设置白名单
	 */
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
	res.header("Access-Control-Allow-Credentials", true);
	// res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization, Accept,X-Requested-With");
	// res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,HEAD");

	// CORS跨域资源共享的时候
	//   + 在发送真实的请求之前，浏览器会先发送一个试探性的请求 OPTIONS「目的:测试客户端和服务器之间是否可以正常的通信」，如果可以正常通信，接下来在发送真实的请求信息！！
	req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}));

/*-API-*/
app.get('/jsonpTest', (req, res) => {
	let fname = req.query.cb;
	let data = [10, 20, 30];
	res.send(`${fname}(${JSON.stringify(data)})`);
});

app.get('/test', (req, res) => {
	res.send('OK');
});

/* STATIC WEB */
app.use(express.static('./'));