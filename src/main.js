const quoteText = document.querySelector('.quote'),
  authorName = document.querySelector('.author .name'),
  quoteBtn = document.querySelector('button'),
  soundBtn = document.querySelector('.sound'),
  copyBtn = document.querySelector('.copy'),
  twitterBtn = document.querySelector('.twitter');

const apiKey = '6gtLUdvBF8C1Hu4XMatRHQ==zfROF3XCElZqSTs8';

const options = {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey,
  },
};

const apiUrl =
  'https://api.api-ninjas.com/v1/quotes?category=inspirational&limit=1';

async function randomQuote() {
  quoteBtn.classList.add('loading');
  quoteBtn.innerText = 'Loading Quote...';
  const response = await fetch(apiUrl, options);
  const data = await response.json();

  quoteText.innerText = data[0].quote;
  authorName.innerText = data[0].author;
  quoteBtn.innerText = 'New Quote';
  quoteBtn.classList.remove('loading');
}

soundBtn.addEventListener('click', () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`
  );
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener('click', () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, '_blank');
});

quoteBtn.addEventListener('click', randomQuote);
