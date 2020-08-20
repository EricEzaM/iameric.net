import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

const SnippetsPage = () => {
  const { snippets, categories } = useStaticQuery(query)

  let snips = snippets.edges
  let cats = categories.group
  debugger
  return (
    <Layout>
      <SEO title="Snippets" />
      <section className="card-container--vertical">
        {/* {snips.map(({ snippet: s }) => (
          <Card
            key={s.id}
            link={s.frontmatter.slug}
            title={s.frontmatter.title}
          />
        ))} */}
        {cats.map(({ fieldValue, totalCount }) => (
          <Card
            link={"/"}
            key={fieldValue}
            title={`${fieldValue} (${totalCount})`}
          />
        ))}
      </section>
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
          }
          excerpt(pruneLength: 150)
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
