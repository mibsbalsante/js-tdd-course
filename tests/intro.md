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
