
// TODO: instanceof return false.

/**
 *  Error class specific to `Notation`.
 *  @name Notation.Error
 *  @memberof! Notation
 *  @class
 *
 */
class NotationError extends Error {

    /**
     *  Initializes a new `Notation.Error` instance.
     *  @constructs Notation.Error
     *  @param {String} message - The error message.
     */
    constructor(message = '') {
        super(message);
        this.name = this.constructor.name;

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

        // V8
        if (Error.hasOwnProperty('captureStackTrace')) { // eslint-disable-line no-prototype-builtins
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                enumerable: false,
                writable: false,
                value: (new Error(message)).stack
            });
        }
    }

}

export default NotationError;
