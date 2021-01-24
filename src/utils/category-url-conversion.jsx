const specialCategoryUrls = {
  "C#": "CSharp",
  "C++": "Cpp",
}

/**
 * Gets a custom url-friendly category name. E.g. C++ would encode to C%2B%2B. Using this, we encode as Cpp instead.
 * @param {string} categoryName The name to encode.
 */
function getCategoryUrl(categoryName) {
  if (Object.keys(specialCategoryUrls).includes(categoryName)) {
    return specialCategoryUrls[categoryName]
  }
  return categoryName
}

module.exports = { getCategoryUrl }
