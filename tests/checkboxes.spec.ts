import { expect } from 'chai';
import { Browser, Builder, By, until, WebDriver } from 'selenium-webdriver';

let driver: WebDriver;

describe('Test Suite for herrokuapp : checkboxes', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should be checked first checkbox: default state and check', async function () {
    await driver.get('http://the-internet.herokuapp.com/checkboxes');
    const checkboxes = await driver.findElements(
      By.css('#checkboxes input[type="checkbox"]')
    );

    //added for checkboxes count check
    console.log(`Found ${checkboxes.length} checkboxes`);
    expect(checkboxes.length).to.be.greaterThan(
      0,
      'сheckboxes should be disaplayed on the page'
    );

    let isCheckedFirst = await checkboxes[0].isSelected();
    expect(isCheckedFirst).to.equal(
      false,
      'first checkbox should be unchecked by default'
    );

    await checkboxes[0].click();
    isCheckedFirst = await checkboxes[0].isSelected();
    expect(isCheckedFirst).to.equal(
      true,
      'first checkbox should be checked after click'
    );
  });

  it('should be checked second checkbox: default state and uncheck', async function () {
    await driver.get('http://the-internet.herokuapp.com/checkboxes');
    const checkboxes = await driver.findElements(
      By.css('#checkboxes input[type="checkbox"]')
    );

    //added for checkboxes count check
    console.log(`Found ${checkboxes.length} checkboxes`);
    expect(checkboxes.length).to.be.greaterThan(
      0,
      'сheckboxes should be disaplayed on the page'
    );

    let isCheckedSecond = await checkboxes[1].isSelected();
    expect(isCheckedSecond).to.equal(
      true,
      'second checkbox should be checked by default'
    );

    await checkboxes[1].click();
    isCheckedSecond = await checkboxes[1].isSelected();
    expect(isCheckedSecond).to.equal(
      false,
      'second checkbox should be unchecked after click'
    );
  });
});
