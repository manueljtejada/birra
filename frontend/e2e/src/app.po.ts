import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }
}
