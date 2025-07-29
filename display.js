export function displayStats(table, stats) {
    table.tBodies[0].innerHTML = '';

    for (const [word, count] of Object.entries(stats)) {
        const row = table.insertRow(-1);
        row.insertCell(0).textContent = word;
        row.insertCell(1).textContent = count;
    }
}