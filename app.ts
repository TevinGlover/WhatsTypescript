import axios from 'axios';

const form: HTMLFormElement = document.querySelector('#defineform');

form.onsubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(form);
    const wordInput = formData.get('defineword') as string;

    if (!wordInput.trim()) {
        alert('Please enter a word.');
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;

    axios.get(apiUrl)
        .then(response => {
            displayResult(response.data);
        })
        .catch(error => {
            displayResultError(error);
        });
};

function displayResult(data: any) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (data.length === 0) {
        resultDiv.innerHTML = '<p>No definition found.</p>';
        return;
    }

    const definition = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example;

    const resultHTML = `
        <p><strong>Definition:</strong> ${definition}</p>
        <p><strong>Example:</strong> ${example}</p>
    `;

    resultDiv.innerHTML = resultHTML;
}

function displayResultError(error: any) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Error fetching definition: ${error.message}</p>`;
}
