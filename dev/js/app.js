
let generateTable = () => {
    const size = parseInt(window.prompt(`Enter table size: `, `10`));
    let value = 0;

    if(isNaN(size) || size < 1) {
        alert(`Invalid input. Please try again...`);
        return;
    }

    console.log(size);

};

window.onload = () => {
    generateTable();
};
