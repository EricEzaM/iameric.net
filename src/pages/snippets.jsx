import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import { getCategoryUrl } from "../utils/category-url-conversion"

const SnippetsPage = () => {
  const { snippets, categories } = useStaticQuery(query)

  let cats = categories.group

  const [category, setCategory] = useState("")
  const [displayedSnippets, setDisplayedSnippets] = useState(snippets.edges)

  function onCategoryClicked(clickedCategory) {
    if (clickedCategory === category) {
      setCategory("")
    } else {
      setCategory(clickedCategory)
    }
  }

  useEffect(() => {
    let filteredSnippets = snippets.edges.filter(({ snippet }) => {
      return snippet.frontmatter.category === category || category === ""
    })

    setDisplayedSnippets(filteredSnippets)
  }, [category, snippets])

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
              <button
                className={[
                  "snippets-category-list__item",
                  fieldValue === category ? "active" : "",
                ].join(" ")}
                key={fieldValue}
                onClick={e => onCategoryClicked(fieldValue, e)}
              >
                {fieldValue}
              </button>
            ))}
            {<div className="snippets-category-list__spacer"></div>}
          </aside>
        </div>
        <section className="card-container--vertical">
          {displayedSnippets.map(
            ({ snippet: { id, frontmatter, excerpt } }) => (
              <Card
                key={id}
                vertical={true}
                link={
                  getCategoryUrl(frontmatter.category) +
                  "/" +
                  encodeURIComponent(frontmatter.slug)
                }
                title={frontmatter.title}
                body={excerpt}
                imgSrc={"https://source.unsplash.com/random/250x250"}
                metaText={frontmatter.date}
                titles={[]}
              />
            )
          )}
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
          excerpt(pruneLength: 200)
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
