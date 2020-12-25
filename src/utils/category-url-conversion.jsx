const specialCategoryUrls = {
  "C#": "CSharp",
  "C++": "Cpp",
}

function getCategoryUrl(categoryName) {
  if (Object.keys(specialCategoryUrls).includes(categoryName)) {
    return specialCategoryUrls[categoryName]
  }
  return categoryName
}

module.exports = { getCategoryUrl }
