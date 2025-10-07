async function getStackData() {
  const PATH = "./src/data/stacks.json";

  try {
    const response = await fetch(PATH);
    const stacks = await response.json();
    return stacks;

  } catch (error) {
    console.error(error);
  }
}

async function showStackIcons() {
  const stackContainer = document.querySelector(".stacks-container");
  const stacks = await getStackData();

  stacks.forEach(stack => {
    stackContainer.insertAdjacentHTML("beforeend", `
        <img src="${stack.iconUrl}" alt="${stack.label}'s icon" class="icon" title="${stack.label}">
      `
    )
  });
}

showStackIcons()
