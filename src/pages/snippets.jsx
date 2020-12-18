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
      <div className="snippets-page-container">
        {/* Aside is inside div so that it's height is independent of section height */}
        <div>
          <aside
            className="snippets-category-list"
            style={{ textAlign: "right" }}
          >
            {cats.map(({ fieldValue, totalCount }) => (
              <button className="snippets-category-list__item" key={fieldValue}>
                {fieldValue}
              </button>
            ))}
          </aside>
        </div>
        <section className="card-container--vertical">
          {snips.map(({ snippet: { id, frontmatter } }) => (
            <Card
              key={id}
              vertical={true}
              link={frontmatter.title}
              title={frontmatter.title}
              body={frontmatter.title}
              imgSrc={"https://source.unsplash.com/random/250x250"}
              metaText={frontmatter.date}
              tags={[]}
            />
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
            slug
            category
            date(formatString: "MMMM Do, YYYY")
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
