import { expect } from 'chai';
import { Browser, Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Select } from 'selenium-webdriver/lib/select';
let driver: WebDriver;

describe('Test Suite for herrokuapp : dropdown', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should be checked for all elements of the dropdown', async function () {
    this.timeout(5000);
    await driver.get('http://the-internet.herokuapp.com/dropdown');

    const dropdown = await driver.findElement(By.id('dropdown'));
    const select = new Select(dropdown);

    const options = await select.getOptions();
    expect(options.length).to.be.greaterThan(
      0,
      'Dropdown options should be present'
    );

    for (let i = 1; i < options.length; i++) {
      // start from 1, because 0 - text
      await select.selectByIndex(i);
      const selectedOption = await select.getFirstSelectedOption();

      expect(selectedOption, `Option ${i} should be selected`).to.not.be.null;

      // @ts-ignore - added by webstorm
      const selectedText = await selectedOption.getText();
      expect(selectedText).to.equal(
        `Option ${i}`,
        `Option ${i} should be selected`
      );
    }
  });
});
