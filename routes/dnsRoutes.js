const express = require('express');
const { checkDnsRecords } = require('../services/dnsService');
const { saveDnsResult, getDnsResults } = require('../db/dnsDatabase');

const router = express.Router();

router.post('/check-dns', async (req, res) => {
    const domains = req.body.domains;
    const results = [];

    for (const domain of domains) {
        const result = await checkDnsRecords(domain);
        saveDnsResult(result);
        results.push(result);
    }

    res.json(results);
});

router.get('/api/dns-results', (req, res) => {
    getDnsResults((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
