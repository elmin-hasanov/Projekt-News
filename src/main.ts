// Variablen und Api Key

const searchInput = document.getElementById("search-input") as HTMLInputElement;
const languageSelect = document.getElementById(
  "language-select"
) as HTMLSelectElement;
const sortSelect = document.getElementById("sort-select") as HTMLSelectElement;
const newsContainer = document.getElementById("news-container") as HTMLElement;

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

// EventListener

searchInput.addEventListener("input", fetchNews);
languageSelect.addEventListener("change", fetchNews);
sortSelect.addEventListener("change", fetchNews);

// Funktion
type Article = {
  articles: any;
  urlToImage: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
};
function fetchNews() {
  const search = searchInput.value || "frontend";
  const language = languageSelect.value;
  const sort = sortSelect.value;
  const apiUrl = `https://newsapi.org/v2/everything?q=${search}&language=${language}&sortBy=${sort}&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data: Article) => {
      newsContainer.innerHTML = "";

      data.articles.forEach((article: Article) => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");
        newsCard.innerHTML = `
          <img src="${article.urlToImage || "placeholder.jpg"}" alt="${
          article.title
        }">
          <h2>${article.title}</h2>
          <p>${article.description || "Keine Beschreibung verfügbar."}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <p>${article.publishedAt}</p>
        `;
        newsContainer.appendChild(newsCard);
      });
    })
    .catch(() => {
      newsContainer.innerHTML = "<p>Fehler beim Laden der Nachrichten.</p>";
    });
}

window.addEventListener("load", fetchNews);
