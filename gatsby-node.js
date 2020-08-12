/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`./src/templates/article.jsx`)

  const result = await graphql(`
    query {
      allMarkdownRemark {
        articles: edges {
          node {
            frontmatter {
              slug
            }
          }
        }
        tags: group(field: frontmatter___tags) {
          fieldValue
          totalCount
          field
        }
      }
    }
  `)

  const articles = result.data.allMarkdownRemark.articles
  const tags = result.data.allMarkdownRemark.tags

  articles.forEach(article => {
    const slug = article.node.frontmatter.slug

    createPage({
      path: `articles/${slug}`,
      component: articleTemplate,
      context: {
        slug: slug,
      },
    })
  })
}

const stringToSlug = string => {}
