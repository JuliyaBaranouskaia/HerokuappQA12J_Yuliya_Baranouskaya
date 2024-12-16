import { expect } from 'chai';
import { Builder, By, Key, WebDriver, until } from 'selenium-webdriver';

let driver: WebDriver;

describe('Test Suite for herokuapp : inputs', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should allow entering different values and use ARROW_UP/ARROW_DOWN', async function () {
    this.timeout(50000);

    await driver.get('http://the-internet.herokuapp.com/inputs');

    const inputElement = await driver.findElement(
      By.css('input[type="number"]')
    );

    await inputElement.click();
    await inputElement.sendKeys('123');
    const inputValue = await inputElement.getAttribute('value');
    expect(inputValue).to.equal('123', 'input should have the correct number');

    await inputElement.clear();
    await inputElement.sendKeys('0');
    await inputElement.sendKeys(Key.ARROW_UP);
    const valueAfterArrowUp = await inputElement.getAttribute('value');
    expect(valueAfterArrowUp).to.equal(
      '1',
      'value should increase after pressing ARROW_UP'
    );

    await inputElement.sendKeys(Key.ARROW_DOWN);
    const valueAfterArrowDown = await inputElement.getAttribute('value');
    expect(valueAfterArrowDown).to.equal(
      '0',
      'Value should decrease after pressing ARROW_DOWN'
    );
  });
});
