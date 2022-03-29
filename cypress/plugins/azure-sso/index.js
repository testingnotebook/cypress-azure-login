"use strict";

const puppeteer = require("puppeteer");

module.exports.AzureSingleSignOn = async function AzureSingleSignOn(
  options = {}
) {
  validateOptions(options);

  const browser = await puppeteer.launch({
    headless: !!options.headless,
    args: ["--no-sandbox"],
  });
  const context = await browser.createIncognitoBrowserContext();

  const page = await await context.newPage();
  await page.goto(options.loginUrl);

  await typeUsername({ page, options });
  await typePassword({ page, options });
  await staySignedIn({ page, options });

  const localStorage = await getLocalStorage({ page, options });

  await finalizeSession({ page, browser, options });

  return {
    localStorage,
  };
};

function validateOptions(options) {
  if (!options.username || !options.password) {
    throw new Error("Username or Password missing for login");
  }
  if (!options.loginUrl) {
    throw new Error("Login Url missing");
  }
  if (!options.postLoginSelector) {
    throw new Error("Post login selector missing");
  }
}

async function typeUsername({ page, options } = {}) {
  await page.waitForSelector("input[name=loginfmt]:not(.moveOffScreen)", {
    visible: true,
    delay: 10000,
  });
  await page.type("input[name=loginfmt]", options.username, { delay: 50 });
  await page.click("input[type=submit]");
}

async function typePassword({ page, options } = {}) {
  await page.waitForSelector(
    "input[name=Password]:not(.moveOffScreen),input[name=passwd]:not(.moveOffScreen)",
    { visible: true, delay: 10000 }
  );

  await page.type("input[name=passwd]", options.password, { delay: 50 });
  await page.click("input[type=submit]");
}

async function staySignedIn({ page, options } = {}) {
  try {
    await page.waitForSelector('[value="No"]', { timeout: 5000 });
    page.click('[value="No"]');
  } catch (error) {
    true;
  }
}

async function getLocalStorage({ page, options } = {}) {
  await page.waitForSelector(options.postLoginSelector, {
    visible: true,
    delay: 10000,
  });
  const localStorage = await page.evaluate(() =>
    Object.assign({}, window.localStorage)
  );

  return localStorage;
}

async function finalizeSession({ page, browser, options } = {}) {
  await browser.close();
}
