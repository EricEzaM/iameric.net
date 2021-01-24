const specialNames = {
  "C#": "CSharp",
  "C++": "Cpp",
}

/**
 * Gets a custom url-friendly category/tag name. E.g. C++ would encode to C%2B%2B. Using this, we encode as Cpp instead.
 * @param {string} name The name to encode.
 */
function getUrlFriendlyName(name) {
  if (Object.keys(specialNames).includes(name)) {
    return specialNames[name]
  }
  return name
}

module.exports = { getUrlFriendlyName }
