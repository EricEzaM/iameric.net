import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

const SnippetsPage = () => {
  const { snippets, categories } = useStaticQuery(query)

  let snips = snippets.edges
  let cats = categories.group

  function onCategoryClicked(category) {}

  function toggleSnippet(id) {}

  return (
    <Layout>
      <SEO title="Snippets" />
      <div className="snippets-container">
        <aside style={{ textAlign: "right" }}>
          {cats.map(({ fieldValue, totalCount }) => (
            <div key={fieldValue}>{fieldValue}</div>
          ))}
        </aside>
        <section className="snippets-container__cards">
          {snips.map(({ snippet: { id, frontmatter } }) => (
            <div className="card card--narrow">
              <Link to="/" key={id}>
                <h3 className="card__title card__title--narrow">
                  {frontmatter.title}
                </h3>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default SnippetsPage

const query = graphql`
  query {
    snippets: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "snippet" } } }
    ) {
      edges {
        snippet: node {
          id
          frontmatter {
            title
            tags
            slug
            category
          }
        }
      }
    }
    categories: allMarkdownRemark {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
