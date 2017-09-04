import { SampleComponentPage } from './app.po';

describe('sample-component App', () => {
  let page: SampleComponentPage;

  beforeEach(() => {
    page = new SampleComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
