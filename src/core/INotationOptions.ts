/**
 * Represents `Notation` options.
 */
export interface INotationOptions {
  /**
   * Whether to throw either when a notation path does not exist on the
   * source (i.e. `#get()` and `#remove()` methods); or notation path exists
   * but overwriting is disabled (i.e. `#set()` method). (Note that
   * `.inspectGet()` and `.inspectRemove()` methods are exceptions). It's
   * recommended to set this to `true` and prevent silent failures if you're
   * working with sensitive data. Regardless of `strict` option, it will
   * always throw on invalid notation syntax or other crucial failures.
   * @default false
   */
  strict?: boolean;
  /**
   * Whether to preserve indices when an item is REMOVED from an array source.
   * This will produce sparse-arrays if enabled.
   * @default false
   */
  preserveIndices?: boolean;
}

export const DEFAULT_NOTATION_OPTIONS: INotationOptions = Object.freeze({
  strict: false,
  preserveIndices: false
});
