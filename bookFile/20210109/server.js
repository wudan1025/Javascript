/*-CREATE SERVER-*/
const express = require('express'),
	app = express();
app.listen(1001, () => {
	console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：1001`);
});

/*-MIDDLE WARE-*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}));

/*-API-*/

/* STATIC WEB */
app.use(express.static('./'));