const { exec } = require('child_process');

function runDigCommand(query, retries = 3) {
    return new Promise((resolve) => {
        const attempt = (remainingRetries) => {
            exec(`dig +short ${query}`, { timeout: 5000 }, (error, stdout) => {
                if (error) {
                    if (remainingRetries > 0) {
                        console.warn(`Retrying DNS fetch for ${query}. Attempts left: ${remainingRetries - 1}`);
                        attempt(remainingRetries - 1);
                    } else {
                        console.error(`Failed to fetch DNS record for ${query}: ${error.message}`);
                        resolve(null);
                    }
                } else {
                    resolve(stdout.trim());
                }
            });
        };
        attempt(retries);
    });
}

module.exports = { runDigCommand };
