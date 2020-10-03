import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SnippetsPage = () => {
  const { snippets, categories } = useStaticQuery(query)

  let snips = snippets.edges
  let cats = categories.group

  function onCategoryClicked(category) {}

  function toggleSnippet(id) {}

  return (
    <Layout>
      <SEO title="Snippets" />
      <div className="snippets-page-container">
        {/* Aside is inside div so that it's height is independand of section height */}
        <div>
          <aside
            className="snippets-category-list"
            style={{ textAlign: "right" }}
          >
            {cats.map(({ fieldValue, totalCount }) => (
              <div className="snippets-category-list__item" key={fieldValue}>
                {fieldValue}
              </div>
            ))}
          </aside>
        </div>
        <vl />
        <section className="">
          {snips.map(({ snippet: { id, frontmatter } }) => (
            <div className="">
              <Link to="/" key={id}>
                <h3 className="">{frontmatter.title}</h3>
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
