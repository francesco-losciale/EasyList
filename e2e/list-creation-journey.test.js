describe('List', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create lists', async () => {
    await expect(element(by.id('Home'))).toBeVisible();

    // create first list
    await element(by.text('Create')).tap();
    await element(by.id('insert-text-here')).typeText('first element of first list')
    await element(by.text('Add')).tap()
    await expect(element(by.text('first element of first list'))).toBeVisible()
    await element(by.text('Save')).tap()

    // verify first list has been created
    await expect(element(by.id('todo-lists'))).toBeVisible();
    await element(by.id('todo-lists')).atIndex(0).tap()
    await expect(element(by.id('todo-list'))).toBeVisible();
    await expect(element(by.text('first element of first list'))).toBeVisible()

    // go back to home
    await element(by.text('Home')).tap()

    // create second list
    await element(by.text('Create')).tap();
    await element(by.id('insert-text-here')).typeText('first element of second list')
    await element(by.text('Add')).tap()
    await expect(element(by.text('first element of second list'))).toBeVisible()
    await element(by.text('Save')).tap()

    // verify second list has been created
    await waitFor(element(by.id('todo-lists-0'))).toBeVisible();
    await waitFor(element(by.id('todo-lists-1'))).toBeVisible();
    await element(by.id('todo-lists-0')).tap()
    await expect(element(by.text('first element of second list'))).toBeVisible()
    await expect(element(by.text('first element of first list'))).not.toBeVisible()


    // go back to home
    await element(by.text('Home')).tap()

    // verify first list is still there
    await waitFor(element(by.id('todo-lists-0'))).toBeVisible();
    await waitFor(element(by.id('todo-lists-1'))).toBeVisible();
    await element(by.id('todo-lists-1')).tap()
    await expect(element(by.text('first element of first list'))).toBeVisible()
    await expect(element(by.text('first element of second list'))).not.toBeVisible()
  });


});
