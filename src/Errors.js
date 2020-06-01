class Errors {
  /**
   * Create a new Errors instance.
   *
   * @param {Object} errors
   */
  constructor(errors = {}) {
    this.record(errors);
  }

  /**
   * Get all of the messages in the bag.
   *
   * @return {object}
   */
  all() {
    return this.errors;
  }

  /**
   * Determine if messages exist for the given key.
   *
   * @param {String} field
   * @return {Boolean}
   */
  has(field) {
    let hasError = this.errors.hasOwnProperty(field);

    if (!hasError) {
      hasError = Object.keys(this.errors).some(
        f => f.startsWith(`${field}.`) || f.startsWith(`${field}[`)
      );
    }

    return hasError;
  }

  /**
   * Get the first message from the bag for a given key.
   *
   * @param {String} field
   * @returns {String|null}
   */
  first(field) {
    return this.get(field)[0];
  }

  /**
   * Get all of the messages from the bag for a given key.
   *
   * @param {String} field
   * @returns {Array}
   */
  get(field) {
    return this.errors[field] || [];
  }

  /**
   * Determine if we have any errors.
   *
   * @return {Boolean}
   */
  any() {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Get all the errors in a flat array.
   *
   * @return {Array}
   */
  flatten () {
    return Object.values(this.errors).reduce((a, b) => a.concat(b), [])
  }

  /**
   * Record the new errors.
   *
   * @param {Object} errors
   */
  record(errors) {
    this.errors = errors;
  }

  /**
   * Clear a specific field, object or all error fields.
   *
   * @param {String?} field
   */
  clear(field) {
    let errors = {};

    if (field) {
      // Prevent reactivity issues
      errors = Object.assign({}, this.errors);

      Object.keys(errors)
        .filter(f => f === field || f.startsWith(`${field}.`) || f.startsWith(`${field}[`))
        .map(f => delete errors[f]);
    }

    this.record(errors);
  }
}

export default Errors;
