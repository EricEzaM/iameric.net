import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useQueryParam, StringParam, withDefault } from "use-query-params"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ButtonGroup from "../components/button-group"
import { getUrlFriendlyName } from "../utils/category-url-conversion"
import SnippetCard from "../components/cards/snippet-card"

const SnippetsPage = () => {
  const { snippets, categories } = useStaticQuery(query)

  let cats = categories.group

  const [displayedSnippets, setDisplayedSnippets] = useState(snippets.edges)

  const [category, setCategory] = useQueryParam(
    "category",
    withDefault(StringParam, "")
  )

  useEffect(() => {
    let filteredSnippets = snippets.edges.filter(({ snippet }) => {
      let snipCat = getUrlFriendlyName(snippet.frontmatter.category)
      return snipCat === category || category === undefined || category === ""
    })

    setDisplayedSnippets(filteredSnippets)
  }, [category, snippets])

  function onCategoryClicked(clickedCategory)
  {
    if (clickedCategory === category) {
      setCategory(undefined)
    } else {
      setCategory(clickedCategory)
    }
  }

  return (
    <Layout>
      <SEO title="Snippets" />

      <div>
        Pieces of code which don't fit the longer format of artciles. Kind of like Github Gists, but they can include some paragraph content for additional context, and be categorised.
      </div>

      <div className="snippets-page-container">
        {/* Aside is inside div so that it's height is independent of section height */}
        <aside className="filters-container">
          <ButtonGroup
            items={cats.map(c =>
            ({
              id: getUrlFriendlyName(c.fieldValue),
              text: c.fieldValue
            }))}
            selectedItems={[category]}
            onButtonClicked={id => onCategoryClicked(id)}
          >
          </ButtonGroup>
        </aside>
        <section className="card-container--vertical">
          {displayedSnippets.map(
            ({ snippet }) => (
              <SnippetCard snippet={ snippet } key={ snippet.id }/>
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
          ...SnippetCardInfo
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
