/* eslint no-prototype-builtins:0 */

const setProto = Object.setPrototypeOf;

/**
 * Error class specific to `Notation`.
 */
export class NotationError extends Error {
  /**
   * Initializes a new `NotationError` instance.
   * @param message - The error message.
   */
  constructor(message: string = '') {
    super(message);
    setProto(this, NotationError.prototype);

    Object.defineProperty(this, 'name', {
      enumerable: false,
      writable: false,
      value: 'NotationError'
    });

    Object.defineProperty(this, 'message', {
      enumerable: false,
      writable: true,
      value: message
    });

    // Stryker disable all: stack-trace wiring is environment-defensive with no
    // behavioral effect (a stack exists either way); the non-V8 branch is
    // unreachable in supported runtimes.
    /* istanbul ignore else -- @preserve: captureStackTrace always exists in V8/Node */
    if (Object.hasOwn(Error, 'captureStackTrace')) {
      // V8
      Error.captureStackTrace(this, NotationError);
    } else {
      /* istanbul ignore start */
      Object.defineProperty(this, 'stack', {
        enumerable: false,
        writable: false,
        value: new Error(message).stack
      });
    }
    /* istanbul ignore stop */
    // Stryker restore all
  }
}
