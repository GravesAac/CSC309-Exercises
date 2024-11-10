const puppeteer = require("puppeteer");

const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

describe("Advanced CSS Exercises ", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  });

  afterAll(async () => {
    try {
      await browser.close();
    } catch (error) {
      console.log(
        "Failed to close browser. Browser may stay open or have already closed."
      );
    }
  });

  describe("Task 1: Responsive grid layout", () => {
    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto(`${BASE_URL}/grid`);
    });

    it("Grid container should exist", async () => {
      const exists = await page.$("#grid");
      expect(exists).not.toBeNull();
    });

    it("Grid should have appropriate columns based on screen size", async () => {
      await page.setViewport({ width: 375, height: 667 }); // Small screen
      let gridCols = await page.evaluate(() =>
        window
          .getComputedStyle(document.querySelector("#grid"))
          .getPropertyValue("grid-template-columns")
      );
      expect(gridCols.split(" ").length).toBe(1);

      await page.setViewport({ width: 768, height: 1024 }); // Medium screen
      gridCols = await page.evaluate(() =>
        window
          .getComputedStyle(document.querySelector("#grid"))
          .getPropertyValue("grid-template-columns")
      );
      expect(gridCols.split(" ").length).toBe(2);

      await page.setViewport({ width: 1024, height: 1366 }); // Large screen
      gridCols = await page.evaluate(() =>
        window
          .getComputedStyle(document.querySelector("#grid"))
          .getPropertyValue("grid-template-columns")
      );
      expect(gridCols.split(" ").length).toBe(4);
    });

    it("Each card should have the required elements and classes", async () => {
      const cardExists = await page.$(".card");
      expect(cardExists).not.toBeNull();

      const imageExists = await page.$(".card-image");
      expect(imageExists).not.toBeNull();

      const titleExists = await page.$(".card-title");
      expect(titleExists).not.toBeNull();

      const descriptionExists = await page.$(".card-description");
      expect(descriptionExists).not.toBeNull();
    });
  });

  describe("Task 2: Flex layout", () => {
    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto(`${BASE_URL}/flex`);
    });

    it("Navbar should exist and be responsive", async () => {
      const navbarExists = await page.$("#navbar");
      expect(navbarExists).not.toBeNull();

      const linksVisible = await page.$eval(
        "#nav-links",
        (el) =>
          window.getComputedStyle(el).getPropertyValue("display") !== "none"
      );
      expect(linksVisible).toBe(true);

      await page.setViewport({ width: 375, height: 667 }); // Small screen
      const hamburgerMenuExists = await page.$("#hamburger-menu");
      expect(hamburgerMenuExists).not.toBeNull();

      await page.click("#hamburger-menu");
      const menuOpen = await page.$eval(
        "#nav-links-sm",
        (el) =>
          window.getComputedStyle(el).getPropertyValue("display") !== "none"
      );
      expect(menuOpen).toBe(true);
    });

    it("Hero section should exist and have the required elements", async () => {
      const heroSectionExists = await page.$("#hero-section");
      expect(heroSectionExists).not.toBeNull();

      const heroTitleExists = await page.$(".hero-title");
      expect(heroTitleExists).not.toBeNull();

      const heroButtonExists = await page.$(".hero-button");
      expect(heroButtonExists).not.toBeNull();
    });

    it("Hero section content should be centered", async () => {
      const justifyContent = await page.$eval("#hero-section", (el) =>
        window.getComputedStyle(el).getPropertyValue("justify-content")
      );
      expect(justifyContent).toBe("center");

      const alignItems = await page.$eval("#hero-section", (el) =>
        window.getComputedStyle(el).getPropertyValue("align-items")
      );
      expect(alignItems).toBe("center");
    });
  });

  describe("Task 3: Multi-section page layout", () => {
    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto(BASE_URL);
    });

    it("Header should exist and be responsive", async () => {
      const headerExists = await page.$("#header");
      expect(headerExists).not.toBeNull();

      // Check if navigation links are visible on larger screens
      await page.setViewport({ width: 1024, height: 1366 }); // Large screen
      const linksVisible = await page.$eval(
        "#nav-links",
        (el) =>
          window.getComputedStyle(el).getPropertyValue("display") !== "none"
      );
      expect(linksVisible).toBe(true);

      // Check if the hamburger menu is visible on small screens
      await page.setViewport({ width: 375, height: 667 }); // Small screen
      const hamburgerMenuExists = await page.$("#hamburger-menu");
      expect(hamburgerMenuExists).not.toBeNull();

      // Click the hamburger menu and check if the menu opens
      await page.click("#hamburger-menu");
      const menuOpen = await page.$eval(
        "#nav-links-sm",
        (el) =>
          window.getComputedStyle(el).getPropertyValue("display") !== "none"
      );
      expect(menuOpen).toBe(true);
    });

    it("Main content section should exist and have required subsections", async () => {
      const mainContentExists = await page.$("#main-content");
      expect(mainContentExists).not.toBeNull();

      const authorsSectionExists = await page.$("#authors");
      expect(authorsSectionExists).not.toBeNull();

      const storesSectionExists = await page.$("#stores");
      expect(storesSectionExists).not.toBeNull();

      const booksSectionExists = await page.$("#books");
      expect(booksSectionExists).not.toBeNull();
    });

    it("Main content section should have responsive grid layouts", async () => {
      await page.setViewport({ width: 1024, height: 1366 }); // Large screen
      let gridCols = await page.evaluate(() =>
        window
          .getComputedStyle(document.querySelector("#authors"))
          .getPropertyValue("grid-template-columns")
      );
      expect(gridCols.split(" ").length).toBe(3); // Should have 3 columns on large screens

      await page.setViewport({ width: 768, height: 1024 }); // Medium screen
      gridCols = await page.evaluate(() =>
        window
          .getComputedStyle(document.querySelector("#authors"))
          .getPropertyValue("grid-template-columns")
      );
      expect(gridCols.split(" ").length).toBe(2); // Should have 2 columns on medium screens

      await page.setViewport({ width: 375, height: 667 }); // Small screen
      gridCols = await page.evaluate(() =>
        window
          .getComputedStyle(document.querySelector("#authors"))
          .getPropertyValue("grid-template-columns")
      );
      expect(gridCols.split(" ").length).toBe(1); // Should have 1 column on small screens
    });

    it("Footer should exist and be responsive", async () => {
      const footerExists = await page.$("#footer");
      expect(footerExists).not.toBeNull();

      const contactInfoExists = await page.$("#footer .contact-info");
      expect(contactInfoExists).not.toBeNull();

      const socialMediaLinksExists = await page.$(
        "#footer .social-media-links"
      );
      expect(socialMediaLinksExists).not.toBeNull();

      // Check responsiveness on small screens
      await page.setViewport({ width: 375, height: 667 }); // Small screen
      const flexDirection = await page.$eval("#footer", (el) =>
        window.getComputedStyle(el).getPropertyValue("flex-direction")
      );
      expect(flexDirection).toBe("column"); // Should stack vertically on small screens
    });
  });
});