/**
 * Check if the given data contains any instance of File.
 *
 * @param  {Object} data
 * @return {Boolean}
 */
const hasFile = (data) => {
  for (let property in data) {
    if (hasFileDeep(data[property])) {
      return true;
    }
  }

  return false;
}

/**
 * Check if the given item is (or contains) a File.
 *
 * @param  {*} item
 * @return {Boolean}
 */
const hasFileDeep = (item) => {
  if (item instanceof Blob || item instanceof FileList) {
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

export {hasFile, hasFileDeep}
