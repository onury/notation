/* eslint consistent-this:0, no-prototype-builtins:0 */

const setProto = Object.setPrototypeOf;

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

        /* istanbul ignore else */
        if (Error.hasOwnProperty('captureStackTrace')) { // V8
            Error.captureStackTrace(this, NotationError);
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
