document.querySelectorAll(".item").forEach(item =>
  item.addEventListener("click", () => {
    item.scrollIntoView({ behavior: "smooth", inline: "center" });
  })
);
