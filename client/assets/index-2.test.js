
describe("Hamburger menu functionality", () => {
    it("should toggle the class 'change' on the container element when clicked", () => {
      document.body.innerHTML = `
        <div class="container"></div>
        <div class="hamburger-menu"></div>
      `;
      const container = document.querySelector(".container");
      const hamburgerMenu = document.querySelector(".hamburger-menu");
      hamburgerMenu.addEventListener("click", () => {
        container.classList.toggle("change")
      });
      hamburgerMenu.click();
      expect(container.classList.contains("change")).toBe(true);
      hamburgerMenu.click();
      expect(container.classList.contains("change")).toBe(false);
    });
  });
  
  describe("Switch color button functionality", () => {
    it("should change the background color of the body and flashcard elements when clicked", () => {
      document.body.innerHTML = `
        <body></body>
        <div class="flashcard"></div>
        <button id="switch-color"></button>
      `;
      const switchColorBtn = document.querySelector("#switch-color");
      const body = document.querySelector("body");
      const flashcard = document.querySelector(".flashcard");
      switchColorBtn.addEventListener("click", function () {
        body.style.backgroundColor = "#0081C9";
        flashcard.style.backgroundColor = "#FFC93C";
      });
      switchColorBtn.click();
      expect(body.style.backgroundColor).toBe("#0081C9");
      expect(flashcard.style.backgroundColor).toBe("#FFC93C");
    });
  });
  