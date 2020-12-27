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
import Dropdown from "../components/dropdown"
import { getCategoryUrl } from "../utils/category-url-conversion"

const ArticlesPage = () => {
  const { articles, tags } = useStaticQuery(query)

  const realTags = tags.group.map((tag, idx) => ({
    id: idx,
    value: tag.fieldValue,
    count: tag.totalCount,
  }))

  // Sort in-place by tag name alphabetically
  realTags.sort(function (a, b) {
    let atag = a.value.toLowerCase()
    let btag = b.value.toLowerCase()
    if (atag < btag) return -1
    if (atag > btag) return 1
    return 0
  })

  const [displayedArticles, setDisplayedArticles] = useState(articles.edges)
  // Use URL query string to store state of filter term and tags
  const [filterTerm, setFilterTerm] = useQueryParam(
    "term",
    withDefault(StringParam, "")
  )
  const [filterTags, setFilterTags] = useQueryParam(
    "tags",
    withDefault(ArrayParam, [])
  )

  // Updates filtered articles when filter term or tags change
  useEffect(() => {
    let filteredArticles = articles.edges.filter(({ article }) => {
      return article.frontmatter.title
        .toLowerCase()
        .includes(filterTerm.toLowerCase())
    })

    if (filterTags.length > 0) {
      filteredArticles = filteredArticles.filter(({ article }) => {
        // Return true if every tag in 'filterTags' appears in the
        // artciles list of tags.
        return filterTags.every(filterTag => {
          return article.frontmatter.tags.includes(filterTag)
        })
      })
    }

    setDisplayedArticles(filteredArticles)
  }, [filterTerm, filterTags, articles])

  // Used for custom display function of dropdown
  function tagToString(tag) {
    return `${tag.value} (${tag.count})`
  }

  function tagsChangedCallback(items) {
    setFilterTags(
      items.map(tag => tag.value),
      "replaceIn"
    )
  }

  return (
    <Layout>
      <SEO title="Articles" />
      <section className="articles-filters">
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
        <Dropdown
          title="Filter by tags..."
          items={realTags}
          multiselect={true}
          onSelectionChanged={tagsChangedCallback}
          displayFunction={tagToString}
          defaultSelection={realTags.filter(t => filterTags.includes(t.value))}
        ></Dropdown>
      </section>
      <section className="card-container">
        {displayedArticles.map(({ article: a }) => (
          <Card
            key={a.id}
            link={a.frontmatter.slug}
            title={a.frontmatter.title}
            body={a.excerpt}
            metaText={a.frontmatter.date}
            imgSrc={"https://source.unsplash.com/random/500x250"}
            tagTitles={a.frontmatter.tags}
            tagLinks={a.frontmatter.tags.map(
              t => "articles?tags=" + getCategoryUrl(t)
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
            date(formatString: "MMMM Do, YYYY")
          }
          excerpt(pruneLength: 150)
        }
      }
    }
    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
