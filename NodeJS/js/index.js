import fs from 'fs';
import http from 'http';
import path from 'path';

// Function to read a file asynchronously
export const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

// Function to create a simple HTTP server
export const createServer = (port) => {
    const server = http.createServer(async (req, res) => {
        let filePath = req.url === '/' ? '/index.html' : req.url;
        filePath = path.join(process.cwd(), 'html', filePath);
        console.log(`Serving file: ${filePath}`);

        try {
            const data = await readFileAsync(filePath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        } catch (err) {
            const notFoundPath = path.join(process.cwd(), 'html', 'notfound.html');
            try {
                const notFoundData = await readFileAsync(notFoundPath);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(notFoundData);
            } catch {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 - Page Not Found');
            }
        }
    });

    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });

    return server;
};

// Function to get the absolute path of a file
export const getAbsolutePath = (relativePath) => {
    return path.resolve(relativePath);
};

// Example usage
createServer(3000);
