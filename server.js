const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const port = 8080;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Get local IP address
const getLocalIP = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const iface of networkInterfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to localhost
};

const hostname = getLocalIP();

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});