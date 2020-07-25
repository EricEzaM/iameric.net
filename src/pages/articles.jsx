import React, { useState, useEffect } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

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
          <div key={a.id} className={"card"}>
            <div className={"card__content"}>
              <Link to={"/" + a.frontmatter.slug}>
                <img
                  className={"card__image"}
                  width="500"
                  height="250"
                  src="https://source.unsplash.com/random/500x250"
                  alt="TODO something"
                ></img>
                <h3 className={"card__title"}>{a.frontmatter.title}</h3>
                <div className={"card__body"}>{a.excerpt}</div>
              </Link>
            </div>
            <div className="card__meta">
              <span>
                {a.frontmatter.tags.map((e, i, arr) => (
                  <React.Fragment key={i}>
                    <Link className="tag" to={"/tags/" + e.toLowerCase()}>
                      {e}
                    </Link>
                    {i !== arr.length - 1 && <span> / </span>}
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>
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
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        article: node {
          id
          frontmatter {
            title
            template
            tags
            slug
            date
          }
          excerpt(pruneLength: 200)
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
