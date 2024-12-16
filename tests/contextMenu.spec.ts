import { expect } from 'chai';
import { Browser, Builder, By, until, WebDriver } from 'selenium-webdriver';

let driver: WebDriver;

describe('Test Suite for herrokuapp : contextMenu', () => {
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should be checked right click -> text validation -> alert close', async function () {
    this.timeout(5000);
    await driver.get('http://the-internet.herokuapp.com/context_menu');

    const contextMenuElement = await driver.findElement(By.id('hot-spot'));

    const actions = driver.actions({ async: true });
    await actions.contextClick(contextMenuElement).perform();

    const alert = await driver.wait(until.alertIsPresent(), 5000);

    const alertText = await alert.getText();

    expect(alertText).to.equal(
      'You selected a context menu',
      'alert text is incorrect'
    );

    //tried to use await alert.dismiss(); - was error. found answer https://stackoverflow.com/questions/3613584/webdriver-dismiss-an-alert-box
    const alertObject = await driver.switchTo().alert();
    await alertObject.accept();
  });
});
