/**
 * Represents the notation inspection result object.
 */
export interface INotationInspection {
  /**
   * Notation that is inspected.
   */
  notation: string;
  /**
   * Whether the source object has the given notation as a (leveled)
   * enumerable property. If the property exists but has a value of
   * `undefined`, this will still return `true`.
   */
  has: boolean;
  /**
   * The value of the notated property. If the source object does not have
   * the notation, the value will be `undefined`.
   */
  value?: unknown;
  /**
   * he type of the notated property. If the source object does not have the
   * notation, the type will be `"undefined"`.
   */
  type: string;
  /**
   * Level index of the notated value.
   */
  level: number;
  /**
   * Last note of the notation, if actually exists. For example, last note of
   * `'a.b.c'` is `'c'`.
   */
  lastNote: string;
  /**
   * Normalized representation of the last note of the notation, if actually
   * exists. For example, last note of `'a.b[1]` is `'[1]'` and will be
   * normalized to number `1`; which indicates an array index.
   */
  lastNoteNormalized: string | number;
  /**
   * Whether the parent object of the notation path is an array.
   */
  parentIsArray: boolean;
}
