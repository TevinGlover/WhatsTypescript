"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var form = document.querySelector('#defineform');
form.onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission
    var formData = new FormData(form);
    var wordInput = formData.get('defineword');
    if (!wordInput.trim()) {
        alert('Please enter a word.');
        return;
    }
    var apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/".concat(wordInput);
    axios_1.default.get(apiUrl)
        .then(function (response) {
        displayResult(response.data);
    })
        .catch(function (error) {
        displayResultError(error);
    });
};
function displayResult(data) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (data.length === 0) {
        resultDiv.innerHTML = '<p>No definition found.</p>';
        return;
    }
    var definition = data[0].meanings[0].definitions[0].definition;
    var example = data[0].meanings[0].definitions[0].example;
    var resultHTML = "\n        <p><strong>Definition:</strong> ".concat(definition, "</p>\n        <p><strong>Example:</strong> ").concat(example, "</p>\n    ");
    resultDiv.innerHTML = resultHTML;
}
function displayResultError(error) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<p>Error fetching definition: ".concat(error.message, "</p>");
}
