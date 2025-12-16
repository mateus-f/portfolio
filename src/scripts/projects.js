async function getProjectsData() {
  const PATH = "./src/data/repositories.json";

  try {
    const response = await fetch(PATH);
    const repositories = await response.json();
    return repositories;

  } catch (error) {
    console.error(error);
  }
}

async function showProjects() {
  const cardsContainer = document.querySelector(".cards");
  const cards = await getProjectsData();

  cards.forEach(card => {
    cardsContainer.insertAdjacentHTML("beforeend", `
        <div class="card">
        <div class="image">
          <div class="gradient" aria-hidden="true"></div>
          <div class="anchor-buttons">
            <a href="${card.urlGithub}" target="_blank" rel="noopener noreferrer" title="Acesse o repositório no Github">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.25 3.75C3.00736 3.75 2 4.75736 2 6V18C2 19.2426 3.00736 20.25 4.25 20.25H19.75C20.9926 20.25 22 19.2426 22 18V9C22 7.75736 20.9926 6.75 19.75 6.75H12.25C12.0139 6.75 11.7916 6.63885 11.65 6.45L10.3 4.65C9.87508 4.08344 9.2082 3.75 8.5 3.75H4.25Z"
                  fill="currentColor" />
              </svg>
            </a>
            ${card.urlPreview ? `<a href="${card.urlPreview}" target="_blank" rel="noopener noreferrer" title="Acesse o site">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-external-link-icon lucide-external-link">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </a>` : ""}
          </div>
          <img
            src="${card.urlImage}"
            alt="Print do site '${card.title}'" loading="lazy">
        </div>
        <div class="content">
          <h3>${card.title}</h3>
          <p>${card.description}</p>
          <div class="stacks">
            ${showStackLabel(card.stacks)}
          </div>
        </div>
      </div>
      `
    )
  });
}

function showStackLabel(stacks) {
  let output = "";

  for (const stack in stacks) {
    output += `<span class="${stacks[stack].toLowerCase()}">${stacks[stack]}</span>`;
  }

  return output;
}

showProjects()
