import http from "http";

let server = http
    .createServer((request, reject) => {
        console.log("Server is running")
    })
    .listen(4200, () => {
        console.log('Server is running on port 4200. Go to http://localhost:4200/')
    })