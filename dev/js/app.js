let generateTable = () => {

    const originalTableHeader = document.createElement(`h2`);
    originalTableHeader.appendChild(document.createTextNode(`Originl Matrix`));
    document.body.append(originalTableHeader);

    const createTableContainer = document.createElement(`div`);
    createTableContainer.id = `tableContainer`;
    document.body.appendChild(createTableContainer);

    const size = parseInt(window.prompt(`Enter table size: `, `10`));
    let value = 0;

    if(isNaN(size) || size < 1) {
        alert(`Invalid input. Please try again...`);
        return;
    }

    const tableContainer = document.getElementById(`tableContainer`);
    tableContainer.innerHTML = ``;

    const table = document.createElement(`table`);
    const tableBody = document.createElement(`tbody`);

    for (let i = 0; i < size; i++) {
        const row = document.createElement(`tr`);
        for (let j = 0; j < size; j++) {
            const cell = document.createElement(`td`);
            cell.appendChild(document.createTextNode(`${value++}`));
            const tableContainer = document.createElement(`div`);
            tableContainer.id = `tableContainer`;
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    tableContainer.appendChild(table);
};

window.onload = () => {
    generateTable();
};
