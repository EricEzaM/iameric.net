import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  useQueryParam,
  ArrayParam,
  StringParam,
  withDefault,
} from "use-query-params"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getUrlFriendlyName } from "../utils/category-url-conversion"
import ButtonGroup from "../components/button-group"

const ArticlesPage = () => {
  const { articles, tags: queryTags } = useStaticQuery(query)

  const tags = queryTags.group
    // Map to the representation that the button group expects.
    .map(tag => ({
      id: getUrlFriendlyName(tag.fieldValue),
      text: `${tag.fieldValue} (${tag.totalCount})`,
    }))
    // Sort alphabetically
    .sort((a, b) =>
    {
      let atag = a.text.toLowerCase()
      let btag = b.text.toLowerCase()
      if (atag < btag) return -1
      if (atag > btag) return 1
      return 0
    })

  const [displayedArticles, setDisplayedArticles] = useState(articles.edges)
  // Use URL query string to store state of filter term and tags
  const [filterTerm, setFilterTerm] = useQueryParam(
    "q",
    withDefault(StringParam, "")
  )
  const [selectedTags, setSelectedTags] = useQueryParam(
    "tags",
    withDefault(ArrayParam, [])
  )

  useEffect(() =>
  {
    // Filter Term
    let filteredArticles = articles.edges.filter(({ article }) => {
      return article.frontmatter.title
        .toLowerCase()
        .includes(filterTerm.toLowerCase())
    })

    // Filter Tags
    filteredArticles = filteredArticles.filter(({ article }) =>
    {
      let articleTags = article.frontmatter.tags.map(tag => getUrlFriendlyName(tag))
      return articleTags.some(t => selectedTags.includes(t)) || selectedTags === undefined || selectedTags.length === 0
    })

    setDisplayedArticles(filteredArticles)
  }, [filterTerm, selectedTags, articles])

  function onTagClicked(tagId)
  {
    if (selectedTags.includes(tagId)) {
      let newTags = selectedTags.filter(t => t !== tagId)
      if (newTags.length > 0) {
        setSelectedTags(newTags)
      }
      else {
        setSelectedTags(undefined)
      }
    }
    else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  return (
    <Layout>
      <SEO title="Articles" />
      <section>
        <input
          className="searchbox"
          type="text"
          placeholder="Search"
          value={filterTerm}
          onChange={e =>
            // Set it to undefined if blank so that the query in the url disappears
            setFilterTerm(e.target.value === "" ? undefined : e.target.value)
          }
        />
        <ButtonGroup
          items={tags}
          selectedItems={selectedTags}
          onButtonClicked={onTagClicked}
        />
      </section>
      <section className="card-container">
        {displayedArticles.map(({ article: a }) => (
          <Card
            key={a.id}
            link={a.frontmatter.slug}
            title={a.frontmatter.title}
            body={a.excerpt}
            metaText={a.frontmatter.date}
            imgSrc={{ ...a.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
            tagTitles={a.frontmatter.tags}
            tagLinks={a.frontmatter.tags.map(
              t => "articles?tags=" + getUrlFriendlyName(t)
            )}
          />
        ))}
      </section>
    </Layout>
  )
}

export default ArticlesPage

const query = graphql`
  query {
    articles: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "article" } } }
    ) {
      edges {
        article: node {
          id
          frontmatter {
            title
            tags
            slug
            headerImage {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "MMMM Do, YYYY")
          }
          excerpt(pruneLength: 150)
        }
      }
    }
    tags: allMarkdownRemark (
      filter: { frontmatter: { template: {eq : "article"} } } 
    ) {
      group(field: frontmatter___tags){
        fieldValue
        totalCount
      }
    }
  }
`
