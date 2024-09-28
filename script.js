const arrayContainer = document.getElementById('array-container');
const sortButton = document.getElementById('sort-button');

// Function to generate an array of random heights
function generateArray(size = 20) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 10); // Random heights between 10 and 300
    }
    return array;
}

// Function to render the array as bars
function renderArray(array) {
    arrayContainer.innerHTML = '';
    array.forEach(height => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${height}px`;
        bar.style.width = `${100 / array.length}%`;
        arrayContainer.appendChild(bar);
    });
}

// Bubble sort with animation
async function bubbleSort(array) {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Highlight the bars being compared
            bars[j].classList.add('active');
            bars[j + 1].classList.add('active');

            if (array[j] > array[j + 1]) {
                // Swap the values
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Swap the bars' heights
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            // Pause for visualization
            await new Promise(resolve => setTimeout(resolve, 50));

            // Remove the highlight
            bars[j].classList.remove('active');
            bars[j + 1].classList.remove('active');
        }
    }
}

// Initialize the visualizer
let array = generateArray();
renderArray(array);

// Add event listener to sort button
sortButton.addEventListener('click', async () => {
    sortButton.disabled = true; // Disable button while sorting
    await bubbleSort(array);
    sortButton.disabled = false; // Enable button after sorting
});
