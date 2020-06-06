/**
 * Check if the given data contains any instance of File.
 *
 * @param  {Object} data
 * @return {Boolean}
 */
const hasFile = (data: { [key: string]: any }): Boolean => {
  for (let property in data) {
    if (hasFileDeep(data[property])) {
      return true;
    }
  }

  return false;
}

/**
 * Determines if object is file.
 *
 * @param {Object} item
 * @returns {boolean}
 */
const isFile = (item: any): Boolean => {
  return item instanceof Blob || item instanceof FileList;
}

/**
 * Check if the given item is (or contains) a File.
 *
 * @param  {Object|Array} item
 * @return {Boolean}
 */
const hasFileDeep = (item: any): Boolean => {
  if (isFile(item)) {
    return true;
  }

  if (typeof item === 'object') {
    for (let key in item) {
      if (item.hasOwnProperty(key) && hasFileDeep(item[key])) {
        return true;
      }
    }
  }

  if (Array.isArray(item)) {
    return item.some(element => hasFileDeep(element));
  }

  return false;
}

export {hasFile, isFile, hasFileDeep}
