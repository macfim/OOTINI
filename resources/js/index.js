
const giphyBaseUrl = 'https://api.giphy.com/v1';
const giphyApiKey = 'CnAE1ms9ljz9cuhSvoz1VUgqdTY8V9rK';

const searchBar = document.querySelector('.searchBar');
const clearButtonBlock = document.querySelector('.clearButton-wrapper');

// Trending GIF's GET request
const getTrendingGifs = async () => {

  const trendingGifRequest = '/gifs/trending';
  const requestParams = '?api_key=' + giphyApiKey + '&limit=100';
  const urlToFetch = giphyBaseUrl + trendingGifRequest + requestParams;

  try {

    const response = await fetch(urlToFetch);

    if(response.ok) {

      const jsonresponse = await response.json();
      
      return jsonresponse.data; // returns array of objects
    }

    throw new Error('Request Failed');

  } catch(error) {

    console.error(error);
  }
}

// Search GIF's GET request
const getSearchGifts = async searchInputValue => {

  const searchLanguage = document.querySelector('.languageSwitcher');
  const LanguageValue = searchLanguage.options[searchLanguage.selectedIndex].text;
  const searchGifRequest = '/gifs/search';
  const requestParams = '?api_key=' + giphyApiKey + '&q=' + searchInputValue + '&limit=1000&offset=0&rating=g&lang=' + LanguageValue;
  const urlToFetch = giphyBaseUrl + searchGifRequest + requestParams;

  try {

    const response = await fetch(urlToFetch);

    if (response.ok) {

      const jsonresponse = await response.json();

      return jsonresponse.data;
    }

    throw new Error('Request Failed!');

  } catch(error) {

    console.error(error);
  }

}



const addGifsToPage = (page, array, num = 0) => {

  let lock = false;
  let i = 0, j = 0;
  let end = num;

  while (i < array.length && lock === false) {

    if (array[i].images.original.width === array[i].images.original.height) {
      let gifWrapper = document.createElement('div');
      gifWrapper.classList.add('gifwrapper');

      let gifImg = document.createElement('img');
      gifImg.classList.add('gifImg');
      gifImg.setAttribute('src', array[i].images.original.url);

      page.appendChild(gifWrapper);
      gifWrapper.appendChild(gifImg);
      j++;
    }
    i++;
    if (j >= end && num != 0) lock = true;
  }

  return j;
}

const removeGifsFromPage = page => {

  while(page.firstChild) {
    page.firstChild.remove();
  }
}

const clearSearch = () => {

  const searchPage = document.querySelector('.searchGifs-wrapper');
  const searchLegend = document.querySelector('.searchLegend');
  
  searchBar.value = '';
  clearButtonBlock.style.display = 'none';
  searchLegend.innerHTML = '';

  removeGifsFromPage(searchPage);
}


const addTrendingGifsToMainPage = async () => {

  const trendingPage = document.querySelector('.trendingGifs-wrapper');
  const trendingGifs = await getTrendingGifs();
  
  const numGifsAdded = addGifsToPage(trendingPage, trendingGifs, 7);
}

const addSearchGifsToMainPage = async () => {

  const inputValue = searchBar.value;
  const searchPage = document.querySelector('.searchGifs-wrapper');
  const searchGifsOutput = await getSearchGifts(inputValue);
  const searchLegend = document.querySelector('.searchLegend');
  searchLegend.innerHTML = inputValue;
  clearButtonBlock.style.display = 'block';

  removeGifsFromPage(searchPage);
  const numGifsAdded = addGifsToPage(searchPage, searchGifsOutput);
}














addTrendingGifsToMainPage()

