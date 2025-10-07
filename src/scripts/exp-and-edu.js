async function getExpAndEduData() {
  const PATH = "./src/data/exp-and-edu.json";

  try {
    const response = await fetch(PATH);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}

async function showLearningCard() {
  const learningContainer = document.querySelector(".items-container");
  const learning = await getExpAndEduData();

  learning.forEach(exp => {
    learningContainer.insertAdjacentHTML("beforeend", `
      <div class="item">
          <img src="${exp.logoPath}" alt=${exp.institution}'s logo loading="lazy">
          <div class="content">
            <span class="period">${exp.period}</span>
            <span class="position">${exp.position}</span>
            <span class="institution">${exp.institution}</span>
          </div>
      </div>
      `
    )
  });
}

showLearningCard()
