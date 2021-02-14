/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { getUrlFriendlyName } = require(path.resolve(
  "./src/utils/category-url-conversion.jsx"
))

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`./src/templates/article.jsx`)
  const projectTemplate = path.resolve(`./src/templates/project.jsx`)
  const snippetTemplate = path.resolve(`./src/templates/snippet.jsx`)

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              template
              slug
              category
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

  const allMarkdown = result.data.allMarkdownRemark.edges
  const articles = allMarkdown.filter(
    ({ node }) => node.frontmatter.template == "article"
  )
  const snippets = allMarkdown.filter(
    ({ node }) => node.frontmatter.template == "snippet"
  )
  const projects = allMarkdown.filter(
    ({ node }) => node.frontmatter.template == "project"
  )

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

  projects.forEach(project => {
    const slug = project.node.frontmatter.slug

    createPage({
      path: `projects/${slug}`,
      component: projectTemplate,
      context: {
        slug: slug
      }
    })
  })

  snippets.forEach(snippet => {
    const slug = snippet.node.frontmatter.slug
    const category = snippet.node.frontmatter.category

    createPage({
      path: `snippets/${slug}`,
      component: snippetTemplate,
      context: {
        slug: slug,
        // category: category,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) =>
{
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      url: String
      github: String
    }
  `

  createTypes(typeDefs)
}