import { expect } from 'chai';
import { Browser, Builder, By, until, WebDriver } from 'selenium-webdriver';

let driver: WebDriver;

describe('Test Suite for herrokuapp : add and remove elements', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  //created a separate function to remove the repeating code
  async function getDeleteButtons() {
    const deleteButton = By.xpath("//button[text()='Delete']");
    return await driver.findElements(deleteButton);
  }

  it('should add two Delete buttons', async function () {
    await driver.get('http://the-internet.herokuapp.com/add_remove_elements/');
    const addElementButton = By.xpath("//button[text()='Add Element']");
    await driver.findElement(addElementButton).click();
    await driver.findElement(addElementButton).click();
  });

  it('should check the count of Delete buttons', async function () {
    const deleteButtons = await getDeleteButtons();
    expect(deleteButtons.length).to.equal(2, 'should be 2 delete buttons');
  });

  it('should delete one button Delete and check the remaining count', async function () {
    let deleteButtons = await getDeleteButtons();
    await deleteButtons[0].click();
    deleteButtons = await getDeleteButtons();
    expect(deleteButtons.length).to.equal(1, 'should be 1 delete button left');
  });
});
