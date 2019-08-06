'use strict';

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the repos array
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}" target="blank">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getURL(query) {
  const url = searchURL + `${query}/repos`;
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getURL(searchTerm);
  });
}

$(watchForm);