const quoteText = document.querySelector('.quote'),
  authorName = document.querySelector('.author .name'),
  quoteBtn = document.querySelector('button');

const apiKey = '6gtLUdvBF8C1Hu4XMatRHQ==zfROF3XCElZqSTs8';

const options = {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey,
  },
};

const apiUrl = 'https://api.api-ninjas.com/v1/quotes?limit=1';

async function randomQuote() {
  quoteBtn.classList.add('loading');
  quoteBtn.innerText = 'Loading Quote...';
  const response = await fetch(apiUrl, options);
  const data = await response.json();

  console.log(data);
  quoteText.innerText = data[0].quote;
  authorName.innerText = data[0].author;
  quoteBtn.innerText = 'New Quote';
  quoteBtn.classList.remove('loading');
}

quoteBtn.addEventListener('click', randomQuote);
