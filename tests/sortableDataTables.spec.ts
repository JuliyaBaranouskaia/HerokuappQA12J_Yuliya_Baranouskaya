import { expect } from 'chai';
import { Builder, By, WebDriver } from 'selenium-webdriver';

let driver: WebDriver;

describe('Test Suite for Sortable Data Tables', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should check the content of several table cells', async function () {
    this.timeout(50000);

    await driver.get('http://the-internet.herokuapp.com/tables');
    // added console.log for faster check - were problems during test creation
    const firstCell = await driver
      .findElement(By.xpath('//table//tr[1]//td[1]'))
      .getText();
    console.log(firstCell);
    const secondCell = await driver
      .findElement(By.xpath('//table//tr[1]//td[2]'))
      .getText();
    console.log(secondCell);
    const thirdCell = await driver
      .findElement(By.xpath('//table//tr[2]//td[1]'))
      .getText();
    console.log(thirdCell);
    const fourthCell = await driver
      .findElement(By.xpath('//table//tr[2]//td[2]'))
      .getText();
    console.log(fourthCell);
    const fifthCell = await driver
      .findElement(By.xpath('//table//tr[3]//td[1]'))
      .getText();
    console.log(fifthCell);

    expect(firstCell).to.equal(
      'Smith',
      'first cell in first row should contain "Smith"'
    );
    expect(secondCell).to.equal(
      'John',
      'second cell in first row should contain "John"'
    );
    expect(thirdCell).to.equal(
      'Bach',
      'first cell in second row should contain "Bach"'
    );
    expect(fourthCell).to.equal(
      'Frank',
      'second cell in second row should contain "Frank"'
    );
    expect(fifthCell).to.equal(
      'Doe',
      'first cell in third row should contain "Doe"'
    );
  });
});
