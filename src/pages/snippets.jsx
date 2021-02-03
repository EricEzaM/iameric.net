import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { useQueryParam, StringParam, withDefault } from "use-query-params"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ButtonGroup from "../components/button-group"
import { getUrlFriendlyName } from "../utils/category-url-conversion"

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
            ({ snippet: { id, frontmatter, excerpt } }) => (
              <div className="card card--narrow">
                <Link
                  to={`${getUrlFriendlyName(frontmatter.category)}/${frontmatter.slug}`}
                  className="card__content card__content--vertical"
                >
                  <Img
                    className={"card__image--vertical"}
                    fluid={{ ...frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
                    alt={ `Image for ${frontmatter.title}` }
                  />
                  <div>
                    <h3 className={"card__title card__title--vertical"}>{frontmatter.title}</h3>
                    <date className={"card__date"}>{frontmatter.date}</date>
                  </div>
                </Link>
              </div>
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
            headerImage {
              childImageSharp {
                fluid(quality: 100){
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
