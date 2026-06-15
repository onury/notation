import { NotationError } from '../src/core/NotationError.js';

describe('NotationError', () => {
  test('is an Error / NotationError with the right name and message', () => {
    const err = new NotationError('boom');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(NotationError);
    expect(err.name).toEqual('NotationError');
    expect(err.message).toEqual('boom');
    expect(String(err)).toEqual('NotationError: boom');
  });

  test('defaults the message to an empty string', () => {
    expect(new NotationError().message).toEqual('');
  });

  test('`name` is non-enumerable and non-writable', () => {
    const err = new NotationError('x');
    const d = Object.getOwnPropertyDescriptor(err, 'name');
    expect(d?.enumerable).toEqual(false);
    expect(d?.writable).toEqual(false);
    expect(Object.keys(err)).not.toContain('name');
  });

  test('`message` is non-enumerable but writable', () => {
    const err = new NotationError('x');
    const d = Object.getOwnPropertyDescriptor(err, 'message');
    expect(d?.enumerable).toEqual(false);
    expect(d?.writable).toEqual(true);
    expect(Object.keys(err)).not.toContain('message');
  });

  test('has a stack trace', () => {
    expect(typeof new NotationError('x').stack).toEqual('string');
  });

  test('is catchable as a thrown error', () => {
    expect(() => {
      throw new NotationError('nope');
    }).toThrow(/nope/);
  });
});
