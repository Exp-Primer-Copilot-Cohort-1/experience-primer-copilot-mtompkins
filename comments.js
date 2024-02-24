// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = {
    "1": "This is a comment",
    "2": "This is another comment"
};
var server = http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    if (uri === '/comments') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(comments));
    } else {
        var filename = path.join(process.cwd(), uri);
        fs.exists(filename, function(exists) {
            if (!exists) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('404 Not Found\n');
                res.end();
                return;
            }
            if (fs.statSync(filename).isDirectory()) filename += '/index.html';
            fs.readFile(filename, 'binary', function(err, file) {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.write(err + '\n');
                    res.end();
                    return;
                }
                res.writeHead(200);
                res.write(file, 'binary');
                res.end();
            });
        });
    }
});
server.listen(8080);
console.log('Server running at http://localhost:8080/');
```

- **Step 3** : Open the browser and navigate to http://localhost:8080/comments and you will see the comments in JSON format.

- **Step 4** : If you navigate to http://localhost:8080/ you will see the index.html file.

- **Step 5** : If you navigate to http://localhost:8080/404 you will see a 404 Not Found message.

- **Step 6** : If you navigate to http://localhost:8080/404.html you will see the 404.html file.

- **Step 7** : If you navigate to http://localhost:8080/404/ you will see the index.html file in the 404 directory.

- **Step 8** : If you navigate to http://localhost:8080/404/404.html you will see the 404.html file in the 404 directory.

- **Step 9** : If you navigate to http://localhost:8080/404/404