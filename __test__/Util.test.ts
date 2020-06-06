import {hasFile} from "../src/Util";

describe('Utility methods', () => {
  it('can detect if object/array has a file deeply', () => {
    expect(hasFile({})).toBe(false);

    expect(hasFile({
      name: 'Foo'
    })).toBe(false);

    expect(hasFile({
      avatar: new Blob([], {})
    })).toBe(true);

    expect(hasFile({
      documents: [new File([], 'test')]
    })).toBe(true);

    expect(hasFile({
      profile: {avatar: new File([], 'doc')}
    })).toBe(true);
  });
})
