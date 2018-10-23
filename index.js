//we need an event listener function for a form submission
//we need a function to take the user-inputted text and search youtube's api
//we need a function to render the result to the DOM

//obtain data with search word from API

function getDataFromApi(searchTerm, callback) {
    let url = 'https://www.googleapis.com/youtube/v3/search';
    let params = {
        part: 'snippet',
        key: 'AIzaSyCcFpj2Cb42RpVtN6rpE5K2jH2N2wTgeKI',
        maxResults: 25,
        q: `${searchTerm} in:name`,
        type:'video'
    };
    $.getJSON(url, params, callback);
}


//Spit result into HTML
function renderResult(result) {
    return `
    <div class="js-search-results">
        <img src="${result.snippet.thumbnails.medium.url}" alt="A youtube Thumbnail> 
    </div>`

}

function displayYoutubeSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
  }


//Event listener for form submission
function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        getDataFromApi(query, displayYoutubeSearchData);
      });

}

$(watchSubmit);

