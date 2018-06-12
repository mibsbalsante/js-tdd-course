# video 78 | skip, only, bail

```javascript
// alt: use --bail (or `npm test -- --bail`) to stop test when some case fail

describe('Main', () => {
  describe('Method A', () => {
    context('Case 1', () => {
      it('should happen', () => {});
    });

    // alt: context.only('Case 2', () => {})
    context('Case 2', () => {
      // alt: it.skip('should happen', () => {})
      it('should happen', () => {
        throw new Error('it was just a little mistake');
      });

      it('should happen again', () => {

      });
    });
  });
});
```

# video 79 | mocha hooks

```javascript
describe('Main', () => {
  // it runs once before the test
  before(() => {
    console.log('before');
  });

  // it runs once after the test
  after(() => {
    console.log('after');
  });

  // it runs every time, before every block
  beforeEach(() => {
    console.log('beforeEach');
  });

  // it runs every time, after every block
  afterEach(() => {
    console.log('afterEach');
  });

  it('test 1', () => {
    console.log('test 1');
  });

  it('test 2', () => {
    console.log('test 2');
  });
});
```
