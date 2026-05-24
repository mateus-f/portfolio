const experienceBtn = document.querySelector(".experience-btn");
const educationBtn = document.querySelector(".education-btn");

async function getResumeData() {
  const PATH = "./src/data/resume.json";

  try {
    const response = await fetch(PATH);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}

function dateFormater(stringDate) {
  if (!stringDate) return "";

  const date = new Date(`${stringDate}-02`);
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const year = date.toLocaleString('pt-BR', { year: 'numeric' });

  return `${month} ${year}`;
}

async function showResumeTimeline(type) {
  const timelineContainer = document.querySelector(".items-container .content");
  const resumeData = await getResumeData();
  const filteredData = resumeData.filter(item => item.type === type);

  timelineContainer.innerHTML = "";

  filteredData.forEach(item => {
    timelineContainer.insertAdjacentHTML("beforeend", `
      <div class="item">
          <img src="${item.logoPath}" alt=${item.institution}'s logo loading="lazy">
          <div class="content">
            <span class="period">${dateFormater(item.startDate)} ${item.isCurrent ? "- Presente" : (item.endDate ? `- ${dateFormater(item.endDate)}` : "")}</span>
            <span class="position">${item.role}</span>
            <span class="institution">${item.institution}</span>
          </div>
      </div>
      `
    )
  });
}

experienceBtn.addEventListener("click", () => {
  experienceBtn.classList.add("active");
  educationBtn.classList.remove("active");
  showResumeTimeline("experience");
});

educationBtn.addEventListener("click", () => {
  educationBtn.classList.add("active");
  experienceBtn.classList.remove("active");
  showResumeTimeline("education");
});

console.log(dateFormater("08-2026"));

showResumeTimeline("experience");