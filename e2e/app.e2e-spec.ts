import { StartingBlockAngular2Page } from './app.po';

describe('starting-block-angular2 App', function() {
  let page: StartingBlockAngular2Page;

  beforeEach(() => {
    page = new StartingBlockAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
