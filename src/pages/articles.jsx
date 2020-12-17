import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Dropdown from "../components/dropdown"

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

  const [filterTerm, setFilterTerm] = useState("")
  const [filterTags, setFilterTags] = useState([])
  const [displayedArticles, setDisplayedArticles] = useState(articles.edges)

  // Used for custom display function of dropdown
  function tagToString(tag) {
    return `${tag.value} (${tag.count})`
  }

  // Called when the dropdown selected values change
  function onTagsChanged(tags) {
    setFilterTags(tags)
  }

  // Updates filtered articles when filter term or tags change
  useEffect(() => {
    let filteredArticles = articles.edges.filter(({ article }) => {
      return article.frontmatter.title
        .toLowerCase()
        .includes(filterTerm.toLowerCase())
    })

    let filterTagValues = filterTags.map(ft => ft.value)
    if (filterTags.length > 0) {
      filteredArticles = filteredArticles.filter(({ article }) => {
        // Return true if every tag in 'filterTags' appears in the
        // artciles list of tags.
        return filterTagValues.every(filterTag => {
          return article.frontmatter.tags.includes(filterTag)
        })
      })
    }

    setDisplayedArticles(filteredArticles)
  }, [filterTerm, filterTags, articles])

  return (
    <Layout>
      <SEO title="Articles" />
      <section className="articles-filters">
        <input
          className="searchbox"
          type="text"
          placeholder="Search"
          value={filterTerm}
          onChange={e => setFilterTerm(e.target.value)}
        />
        <Dropdown
          title="Filter by tags..."
          items={realTags}
          multiselect={true}
          onSelectionChanged={onTagsChanged}
          displayFunction={tagToString}
        ></Dropdown>
      </section>
      <section className="card-container">
        {displayedArticles.map(({ article: a }) => (
          <Card
            key={a.id}
            link={a.frontmatter.slug}
            title={a.frontmatter.title}
            body={a.excerpt}
            tags={a.frontmatter.tags}
            metaText={a.frontmatter.date}
            imgSrc={"https://source.unsplash.com/random/500x250"}
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
