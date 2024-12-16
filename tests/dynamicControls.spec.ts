import { expect } from 'chai';
import { Builder, By, WebDriver, until } from 'selenium-webdriver';

let driver: WebDriver;

describe('Test Suite for herokuapp : dynamic controls', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should remove checkbox when "Remove" button is clicked', async function () {
    this.timeout(5000);
    await driver.get('http://the-internet.herokuapp.com/dynamic_controls');

    const checkbox = await driver.findElement(By.css('#checkbox'));
    const checkboxDisplayedBefore = await checkbox.isDisplayed();
    expect(checkboxDisplayedBefore).to.equal(
      true,
      'checkbox should be visible before clicking "Remove"'
    );

    const removeButton = await driver.findElement(
      By.css('#checkbox-example button')
    );
    await removeButton.click();

    //wait until checkbox should be deleted
    await driver.wait(until.stalenessOf(checkbox), 5000);

    //check no checkbox
    const checkboxDisplayedAfter = await checkbox
      .isDisplayed()
      .catch(() => false);
    expect(checkboxDisplayedAfter).to.equal(
      false,
      'checkbox should be removed after clicking "Remove"'
    );

    const addButtonText = await removeButton.getText();
    expect(addButtonText).to.equal(
      'Add',
      'button text should change to "Add" after removing the checkbox'
    );
  });
});
