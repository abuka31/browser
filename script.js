const apiKey = "AIzaSyBdMHsKaVGctMQuEneXwNnwF4XtK6uF-8U"; // Ваш API ключ
const cx = "f06590ad309d747e7"; // Идентификатор поисковой системы

// Функция обработки формы поиска на главной странице
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById('search-form');
  
  searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const query = document.getElementById('search-box').value;
    if (query) {
      window.location.href = `results.html?q=${encodeURIComponent(query)}`;
    }
  });
});

// Функция для получения результатов поиска на странице results.html
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");

  if (query) {
    fetchResults(query);
  }
});

async function fetchResults(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

// Отображение результатов на странице
function displayResults(data) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  if (data.items) {
    data.items.forEach((item) => {
      const resultDiv = document.createElement("div");
      resultDiv.className = "result";

      const title = document.createElement("a");
      title.href = item.link;
      title.textContent = item.title;
      title.target = "_blank";

      const snippet = document.createElement("p");
      snippet.textContent = item.snippet;

      resultDiv.appendChild(title);
      resultDiv.appendChild(snippet);
      resultsContainer.appendChild(resultDiv);
    });
  } else {
    resultsContainer.innerHTML = `<p>Результаты не найдены.</p>`;
  }
}
