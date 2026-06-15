/**
 * Represents `Notation` filter options.
 */
export interface INotationFilterOptions {
  /**
   * Whether negated items strictly remove every match. Note that, regardless
   * of this option, if any item has an exact negated version; non-negated is
   * always removed.
   * @default false
   */
  restrictive?: boolean;
}
