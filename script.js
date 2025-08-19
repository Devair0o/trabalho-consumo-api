const input = document.getElementById('searchInput');
const results = document.getElementById('results');
const paginate = document.getElementById('paginate');

let page = 1;
let maxPage = 1;

async function fetchCharacters(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      results.innerHTML = '<p>Nenhum personagem com esse nome.</p>';
      paginate.innerHTML = '';
      return;
    }

    showCharacters(data.results);
    maxPage = data.info.pages || 1;
    showPagination();
  } catch (err) {
    results.innerHTML = '<p>Erro...</p>';
    console.error(err);
  }
}

function showCharacters(chars) {
  results.innerHTML = chars.map(c => `
    <div class="card">
      <img src="${c.image}" alt="${c.name}">
      <h3>${c.name}</h3>
      <p><strong>Espécie:</strong> ${c.species}<br>
         <strong>Gênero:</strong> ${c.gender}<br>
         <strong>Origem:</strong> ${c.origin.name}<br>
         <strong>Status:</strong> ${c.status}
      </p>
    </div>
  `).join('');
}

function showPagination() {
  paginate.innerHTML = '';

  if (page > 1) {
    const prev = document.createElement('button');
    prev.textContent = 'anterior';
    prev.onclick = () => loadPage(page - 1);
    paginate.appendChild(prev);
  }

  if (page < maxPage) {
    const next = document.createElement('button');
    next.textContent = 'próximo';
    next.onclick = () => loadPage(page + 1);
    paginate.appendChild(next);
  }
}

function loadPage(p) {
  page = p;
  fetchCharacters(`https://rickandmortyapi.com/api/character?page=${page}`);
}

input.addEventListener('input', () => {
  const name = input.value.trim();
  if (name) {
    fetchCharacters(`https://rickandmortyapi.com/api/character/?name=${name}`);
  } else {
    loadPage(1);
  }
});

// Iniciar na página 1
loadPage(1);
