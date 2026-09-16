const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const htmlFiles = ['about.html', 'contact.html', 'documentation.html', 'financial-report.html', 'open-account.html', 'security.html'];

console.log('Reading index.html...');
const indexHtml = fs.readFileSync(path.join(targetDir, 'index.html'), 'utf8');

const headerRegex = /(<header[^>]*id="main-header"[^>]*>[\s\S]*?<\/header>)/;
const footerRegex = /(<footer[^>]*id="main-footer"[^>]*>[\s\S]*?<\/footer>)/;

const headerMatch = indexHtml.match(headerRegex);
const footerMatch = indexHtml.match(footerRegex);

if (!headerMatch || !footerMatch) {
    console.error('Could not find the header or footer in index.html!');
    process.exit(1);
}

const headerHtml = headerMatch[1];
const footerHtml = footerMatch[1];

let updatedCount = 0;

for (const file of htmlFiles) {
    const filePath = path.join(targetDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        let changed = false;
        
        const fileHeaderMatch = content.match(headerRegex);
        if (fileHeaderMatch && fileHeaderMatch[1] !== headerHtml) {
            content = content.replace(headerRegex, () => headerHtml);
            changed = true;
        } else if (!fileHeaderMatch) {
            console.log('WARNING: Could not find header in ' + file);
        }
        
        const fileFooterMatch = content.match(footerRegex);
        if (fileFooterMatch && fileFooterMatch[1] !== footerHtml) {
            content = content.replace(footerRegex, () => footerHtml);
            changed = true;
        } else if (!fileFooterMatch) {
            console.log('WARNING: Could not find footer in ' + file);
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content);
            console.log('Successfully updated ' + file);
            updatedCount++;
        }
    }
}

if (updatedCount === 0) {
    console.log('All pages are already up to date!');
} else {
    console.log('Sync complete! Updated ' + updatedCount + ' pages to match index.html');
}
