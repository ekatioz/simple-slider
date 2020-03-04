const items = Array.from(document.querySelectorAll(".item")).map(item => ({
  container: item,
  radio: item.querySelector("input[type='radio']")
}));

const controls = {
  next : document.querySelector(".control-button.icon-next"),
  prev : document.querySelector(".control-button.icon-prev")
}

items.forEach(({ container, radio }) =>
  radio.addEventListener("change", e => {
    scrollToCenter(container);
  })
);

addEventListener("keydown", event => {
  if (event.key === "ArrowRight") {
    selectNext();
    event.preventDefault();
  } else if (event.key === "ArrowLeft") {
    selectPrev();
    event.preventDefault();
  }
});

controls.next.addEventListener("click", () => selectNext());
controls.prev.addEventListener("click", () => selectPrev());

function scrollToCenter(element) {
  element.scrollIntoView({ behavior: "smooth", inline: "center" });
}

function selectPrev() {
  const active = items.indexOf(getActiveItem());
  const prev = active == 0 ? items.length - 1 : active - 1;
  items[prev].radio.checked = true;
  scrollToCenter(items[prev].container);
}

function selectNext() {
  const active = items.indexOf(getActiveItem());
  const next = active + 1 == items.length ? 0 : active + 1;
  items[next].radio.checked = true;
  scrollToCenter(items[next].container);
}

function getActiveItem() {
  const active = items.find(i => i.radio.checked);
  return active;
}
