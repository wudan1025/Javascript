let str = `content-encoding: gzip
content-type: text/html; charset=utf-8
date: Sat, 16 Jan 2021 09:17:16 GMT
server: yunjiasu
tracecode: 10366604600460907786011617
vary: Accept-Encoding
yjs-id: 9b71301e63182cf0-115`;

str = str.split(/(?:\n)/g);
str.forEach(item => {
    if (!item) return;
    item = item.split(': ');
    console.log(item[0], item[1]);
});