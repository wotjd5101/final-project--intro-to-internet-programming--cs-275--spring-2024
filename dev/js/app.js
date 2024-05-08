let generateTable = () => {

    const originalTableHeader = document.createElement(`h2`);
    originalTableHeader.appendChild(document.createTextNode(`Originl Matrix`));
    document.body.append(originalTableHeader);

    const createTableContainer = document.createElement(`div`);
    createTableContainer.id = `tableContainer`;
    document.body.appendChild(createTableContainer);

    const createFlippedTableContainer = document.createElement(`div`);
    createFlippedTableContainer.id = `flippedTableContainer`;
    document.body.appendChild(createFlippedTableContainer);

    const size = parseInt(window.prompt(`Enter table size: `, `10`));
    let value = 0;

    if(isNaN(size) || size < 1) {
        alert(`Invalid input. Please try again...`);
        return;
    }

    const tableContainer = document.getElementById(`tableContainer`);
    tableContainer.innerHTML = ``;

    const flippedContainer = document.getElementById(`flippedTableContainer`);
    flippedContainer.innerHTML = ``;

    const table = document.createElement(`table`);
    const tableBody = document.createElement(`tbody`);
    const originalMatrix = [];

    for (let i = 0; i < size; i++) {
        const row = document.createElement(`tr`);
        const rowValues = [];

        for (let j = 0; j < size; j++) {
            const cell = document.createElement(`td`);
            cell.appendChild(document.createTextNode(`${value++}`));
            row.appendChild(cell);

            const tableContainer = document.createElement(`div`);
            tableContainer.id = `tableContainer`;
            row.appendChild(cell);
            rowValues.push(parseInt(cell.textContent));
        }
        tableBody.appendChild(row);
        originalMatrix.push(rowValues);

    }

    table.appendChild(tableBody);
    tableContainer.appendChild(table);

    const flippedMatrix = flipMatrix(originalMatrix);
    const flippedTable = document.createElement(`table`);
    const flippedTableBody = document.createElement(`tbody`);

    const flippedTableHeader = document.createElement(`h2`);
    flippedTableHeader.appendChild(document.createTextNode(`Flipped Matrix`));
    document.body.append(flippedTableHeader);

    for (let i = 0; i < flippedMatrix.length; i++) {
        const row = document.createElement(`tr`);
        for (let j = 0; j < flippedMatrix[i].length; j++) {
            const cell = document.createElement(`td`);
            cell.appendChild(document.createTextNode(`${flippedMatrix[i][j]}`));
            row.appendChild(cell);
        }
        flippedTableBody.appendChild(row);
    }

    flippedTable.appendChild(flippedTableBody);
    flippedContainer.appendChild(flippedTable);
};

let flipMatrix = (matrix) => {
    const size = matrix.length;
    const flippedMatrix = Array.from({ length: size}, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            flippedMatrix[size - 1- j][size -1 - i] = matrix[i][j];
        }
    }

    return flippedMatrix;
};

window.onload = () => {
    generateTable();
};
