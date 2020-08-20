import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

const SnippetsPage = () => {
  const { snippets, categories } = useStaticQuery(query)

  let snips = snippets.edges
  let cats = categories.group

  return (
    <Layout>
      <SEO title="Snippets" />
      <section className="card-container--vertical">
        {cats.map(({ fieldValue: cat, totalCount: catCount }) => (
          <>
            <Card link={"/"} key={cat} title={`${cat} (${catCount})`} />
            {snips
              .filter(({ snippet }) => snippet.frontmatter.category == cat)
              .map(({ snippet }) => (
                <Card
                  link={"/"}
                  key={snippet.id}
                  title={snippet.frontmatter.title}
                  className={"card--light"}
                />
              ))}
          </>
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
