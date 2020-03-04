function scrollToCenter(element) {
  setTimeout(() => {
    element.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, 100); // auf css transform warten
}

function selectPrev(items, activeItem) {
  const active = items.indexOf(activeItem);
  const prev = active == 0 ? items.length - 1 : active - 1;
  items[prev].radio.checked = true;
  scrollToCenter(items[prev].container);
}

function selectNext(items, activeItem) {
  const active = items.indexOf(activeItem);
  const next = active + 1 == items.length ? 0 : active + 1;
  items[next].radio.checked = true;
  scrollToCenter(items[next].container);
}

class KartenCarousel extends HTMLElement {
  static get tagName() {
    return "karten-carousel";
  }

  connectedCallback() {
    this.declareElements();
    this.declareAndRegisterListeners();
  }

  declareElements() {
    this.items = Array.from(document.querySelectorAll(".item")).map(item => ({
      container: item,
      radio: item.querySelector("input[type='radio']")
    }));

    this.controls = {
      next: document.querySelector(".control-button.icon-next"),
      prev: document.querySelector(".control-button.icon-prev")
    };
  }

  declareAndRegisterListeners() {
    this.items.forEach(({ container, radio }) =>
      this.addListener(radio, "change", () => scrollToCenter(container))
    );
    this.addListener(this, "keydown", event => {
      if (event.key === "ArrowRight") {
        selectNext(this.items, this.activeItem);
        event.preventDefault();
      } else if (event.key === "ArrowLeft") {
        selectPrev(this.items, this.activeItem);
        event.preventDefault();
      }
    });
    this.addListener(this.controls.next,"click", () => selectNext(this.items, this.activeItem));
    this.addListener(this.controls.prev,"click", () => selectPrev(this.items, this.activeItem));
  }

  get activeItem() {
    return this.items.find(i => i.radio.checked);
  }

  /**
   * @param {HTMLElement} element
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   */
  addListener(element, type, listener) {
    this.listeners = this.listeners || [];
    this.listeners.push({ listener, element, type });
    element.addEventListener(type, listener);
  }

  disconnectedCallback() {
    this.listeners.forEach(({ element, type, listener }) => {
      if (element) {
        element.removeEventListener(type, listener);
      }
    });
  }
}

if (!customElements.get(KartenCarousel.tagName)) {
  customElements.define(KartenCarousel.tagName, KartenCarousel);
}