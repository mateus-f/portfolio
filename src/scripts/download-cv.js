const downloadBtns = document.querySelectorAll(".download");

downloadBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const hash = Date.now();
    const fileName = `CURRICULO_MATEUS_FERREIRA_${hash}.pdf`;
    const link = document.createElement("a");

    link.setAttribute("href", "./src/assets/curriculum/CURRICULO_MATEUS_FERREIRA.pdf")
    link.setAttribute("download", fileName)

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
})