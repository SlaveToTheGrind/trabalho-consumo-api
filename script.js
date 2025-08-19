let currentPage = 1;
let totalPages = 0;

async function fetchCharacters() {
  const input = document.getElementById("searchInput").value.trim();
  const baseURL = "https://rickandmortyapi.com/api/character/";
  const url = input 
    ? `${baseURL}?name=${encodeURIComponent(input)}&page=${currentPage}`
    : `${baseURL}?page=${currentPage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    totalPages = data.info.pages;

    renderCharacters(data.results);
    renderPagination();
  } catch (err) {
    document.getElementById("content").innerHTML = "<p>No characters found.</p>";
    document.getElementById("pagination").innerHTML = "";
  }
}

function renderCharacters(characters) {
  const html = characters.map(c => `
    <li>
      <a href="detail.html#${c.id}">${c.name}</a><br/>
      <img src="${c.image}" alt="${c.name}" width="100"/>
    </li>
  `).join("");

  document.getElementById("content").innerHTML = `<ul>${html}</ul>`;
}

function renderPagination() {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.addEventListener("click", () => {
      currentPage--;
      fetchCharacters();
    });
    container.appendChild(prevBtn);
  }

  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.addEventListener("click", () => {
      currentPage++;
      fetchCharacters();
    });
    container.appendChild(nextBtn);
  }
}


document.getElementById("btnSearch").addEventListener("click", () => {
  currentPage = 1;
  fetchCharacters();
});


fetchCharacters();