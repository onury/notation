/**
 * Represents the notation glob inspection result object.
 */
export interface INotationGlobInspection {
  /**
   * Original glob notation.
   */
  glob: string;
  /**
   * Absolute (non-negated) version of the original glob notation.
   */
  absGlob: string;
  /**
   * Indicates whether the original glob notation is negated with a `!`
   * prefix.
   */
  isNegated: boolean;
  /**
   * Indicates whether it's an array glog.
   * e.g. `[*]` or `[1]` are array globs. `["1"]` is not.
   */
  isArrayGlob: boolean;
}
