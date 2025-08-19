const detailContainer = document.getElementById('detail');
const characterId = Number(window.location.hash.replace("#", ""));

async function fetchCharacterDetail() {
  if (!characterId) {
    detailContainer.textContent = "Character not found.";
    return;
  }

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    const character = await response.json();
    renderCharacterDetail(character);
  } catch (err) {
    detailContainer.textContent = "Error fetching character.";
  }
}

function renderCharacterDetail(character) {
  
  detailContainer.innerHTML = "";

 
  const card = document.createElement("div");
  card.className = "card-detail";


  const name = document.createElement("h2");
  name.textContent = character.name;
  card.appendChild(name);

  
  const img = document.createElement("img");
  img.src = character.image;
  img.alt = character.name;
  img.className = "character-image";
  card.appendChild(img);

  
  function createInfo(label, value, extraClass = "") {
    const p = document.createElement("p");
    p.className = extraClass;
    const strong = document.createElement("strong");
    strong.textContent = label + ": ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value));
    return p;
  }
  

  card.appendChild(createInfo("Species", character.species));
  card.appendChild(createInfo("Gender", character.gender));

  
  let statusClass = "";
  if (character.status.toLowerCase() === "alive") statusClass = "status-alive";
  else if (character.status.toLowerCase() === "dead") statusClass = "status-dead";
  else statusClass = "status-unknown";

  card.appendChild(createInfo("Status", character.status, statusClass));

  card.appendChild(createInfo("Origin", character.origin.name));
  card.appendChild(createInfo("Location", character.location.name));

  
  const backLink = document.createElement("a");
  backLink.href = "index.html";
  backLink.textContent = "← Back to list";
  backLink.className = "back-button";
  card.appendChild(backLink);

  detailContainer.appendChild(card);
}

fetchCharacterDetail();

/**
 * Buscar o personagem especifico e trazer os seguintes dados:
 * nome
 * imagem
 * especie
 * gênero
 * mundo/dimensão
 * status
 * 1 ponto extra pra quem colocar o link para detail la na index
 * **/