const express = require('express');
const cron = require('node-cron');
const dnsRoutes = require('./routes/dnsRoutes');
const { checkDnsRecords } = require('./services/dnsService');
const { saveDnsResult } = require('./db/dnsDatabase');

const app = express();
app.use(express.json());
app.use('/', dnsRoutes);

// Scheduled DNS check (every hour)
cron.schedule('0 * * * *', async () => {
    console.log('Scheduled DNS check running...');
    const domains = ['example.com', 'anotherdomain.com'];

    for (const domain of domains) {
        const result = await checkDnsRecords(domain);
        saveDnsResult(result);
    }

    console.log('DNS check completed.');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
