const fs = require('fs');
const path = require('./PS_2025.05.27_16.20.12.csv');

/**
 * Converts CSV data to JSON array.
 * @param {string} csv - The CSV string.
 * @returns {Array<Object>} - The JSON array.
 */
function csvToJson(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        return headers.reduce((obj, header, idx) => {
            obj[header] = values[idx];
            return obj;
        }, {});
    });
}

// Example usage:
const csvFilePath = path.join(__dirname, 'data.csv');
const jsonFilePath = path.join(__dirname, 'data.json');

fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading CSV file:', err);
        return;
    }
    const json = csvToJson(data);
    fs.writeFile(jsonFilePath, JSON.stringify(json, null, 2), err => {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('CSV converted to JSON successfully.');
        }
    });
});



function csvToJson(csvString) {
    const rows = csvString
        .split("\n");

    const headers = rows[0]
        .split(",");

    const jsonData = [];
    for (let i = 1; i < rows.length; i++) {

        const values = rows[i]
            .split(",");

        const obj = {};

        for (let j = 0; j < headers.length; j++) {

            const key = headers[j]
                .trim();
            const value = values[j]
                .trim();

            obj[key] = value;
        }

        jsonData.push(obj);
    }
    return JSON.stringify(jsonData);
}
const csvData = "name,age,city\nAlice,30,New York\nBob,25,London";
const jsonData = csvToJson(path.join(__dirname, 'PS_2025.05.27_16.20.12.csv'));
console.log(jsonData);