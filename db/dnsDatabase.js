const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./dns_results.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS dns_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            domain TEXT,
            spf TEXT,
            dkim TEXT,
            dmarc TEXT,
            checkedAt TEXT
        )
    `);
});

function saveDnsResult({ domain, spf, dkim, dmarc, checkedAt }) {
    db.run(
        'INSERT INTO dns_results (domain, spf, dkim, dmarc, checkedAt) VALUES (?, ?, ?, ?, ?)',
        [domain, spf, dkim, dmarc, checkedAt]
    );
}

function getDnsResults(callback) {
    db.all('SELECT * FROM dns_results', [], callback);
}

module.exports = { saveDnsResult, getDnsResults };
