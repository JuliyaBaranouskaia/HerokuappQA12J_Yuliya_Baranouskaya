import { expect } from 'chai';
import { Builder, By, WebDriver, until, Actions } from 'selenium-webdriver';

let driver: WebDriver;

describe('Test Suite for herokuapp : hovers', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should hover over profiles -> validate name -> click link', async function () {
    this.timeout(5000);
    await driver.get('http://the-internet.herokuapp.com/hovers');

    const getProfileElements = await driver.findElements(By.css('.figure'));

    for (let i = 0; i < getProfileElements.length; i++) {
      const getProfileImage = getProfileElements[i];
      const profileNameElement = await getProfileElements[i].findElement(
        By.css('.figcaption h5')
      );
      const profileLink = await getProfileElements[i]
        .findElement(By.css('.figcaption a'))
        .getAttribute('href');

      const actions = driver.actions({ async: true });

      await actions.move({ origin: getProfileImage }).perform();
      await driver.wait(until.elementIsVisible(profileNameElement), 5000);

      const displayedName = await profileNameElement.getText();
      expect(displayedName).to.equal(
        `name: user${i + 1}`,
        `Profile ${i + 1}: Name should match after hover`
      );

      await getProfileElements[i].findElement(By.css('.figcaption a')).click();
      await driver.wait(until.urlContains(profileLink), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.equal(
        profileLink,
        `Profile ${i + 1}: URL should match after clicking`
      );

      await driver.navigate().back();
    }
  });
});
