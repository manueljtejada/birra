import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to favorites page', () => {
    page.navigateTo();
    const navlink = page.getAllElements('a').get(2);
    navlink.click();
    expect(page.getTitleText()).toBe('Your Favorite Beers');
  });
});
