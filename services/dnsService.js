const { runDigCommand } = require('../utils/digUtil');

async function checkSpfRecord(domain) {
    const spfRecord = await runDigCommand(`${domain} TXT`);
    return spfRecord && spfRecord.includes('v=spf1') ? 'Valid' : 'Invalid';
}

async function checkDkimRecord(domain) {
    const selector = `default._domainkey.${domain}`;
    const dkimRecord = await runDigCommand(`${selector} TXT`);
    return dkimRecord ? 'Valid' : 'Invalid';
}

async function checkDmarcRecord(domain) {
    const dmarcRecord = await runDigCommand(`_dmarc.${domain} TXT`);
    return dmarcRecord && dmarcRecord.includes('v=DMARC1') ? 'Valid' : 'Invalid';
}

async function checkDnsRecords(domain) {
    const spf = await checkSpfRecord(domain);
    const dkim = await checkDkimRecord(domain);
    const dmarc = await checkDmarcRecord(domain);
    const checkedAt = new Date().toISOString();
    return { domain, spf, dkim, dmarc, checkedAt };
}

module.exports = { checkDnsRecords };
