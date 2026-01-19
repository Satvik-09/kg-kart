
const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {

    // SAVE FEEDBACK
    if (req.method === "POST" && req.url === "/feedback") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            fs.appendFile("feedback.txt", body + "\n-----------------\n", err => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Error saving feedback");
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/plain",
                        "Access-Control-Allow-Origin": "*"
                    });
                    res.end("Feedback Saved");
                }
            });
        });
    }

    // VIEW FEEDBACK
    else if (req.method === "GET" && req.url === "/view-feedback") {
        if (fs.existsSync("feedback.txt")) {
            const data = fs.readFileSync("feedback.txt", "utf8");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
        } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("No feedback found");
        }
    }

    // INVALID ROUTE
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page Not Found");
    }

}).listen(5178, () => {
    console.log("Server running on http://localhost:5178");
});
