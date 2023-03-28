const dropdown = document.querySelectorAll('.dropdown');
dropdown.forEach((dropdown) => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const selections = menu.querySelectorAll('li');
  const selected = dropdown.querySelector('.selected');
  let updatedApiUrl = '';

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  selections.forEach((selection) => {
    selection.addEventListener('click', () => {
      selected.innerText = selection.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
      selections.forEach((s) => {
        s.classList.remove('active');
      });
      selection.classList.add('active');
      updatedApiUrl = `https://api.api-ninjas.com/v1/quotes?category=${selection.innerText}`;
    });
  });

  const quoteText = document.querySelector('.quote');
  const authorName = document.querySelector('.author .name');
  const quoteBtn = document.querySelector('button');
  const soundBtn = document.querySelector('.sound');
  const copyBtn = document.querySelector('.copy');
  const twitterBtn = document.querySelector('.twitter');

  const apiKey = 'UGEVvw6yLXUzrG15EQXi33oeTJ8wt81W0Jg8INpu';

  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey,
    },
  };

  async function randomQuote() {
    quoteBtn.classList.add('loading');
    quoteBtn.innerText = 'Loading Quote...';
    const response = await fetch(updatedApiUrl, options);
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

  quoteBtn.addEventListener('click', () => {
    // Check if a selection has been made
    if (updatedApiUrl) {
      randomQuote();
    } else {
      alert('Please select a category from the dropdown menu.');
    }
  });
});
