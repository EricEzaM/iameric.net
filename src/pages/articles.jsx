import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useEffect } from "react"

const ArticlesPage = () => {
  const { articles, tags } = useStaticQuery(query)

  const [filterTerm, setFilterTerm] = useState("")
  const [displayedArticles, setDisplayedArticles] = useState(articles.edges)

  useEffect(() => {
    let filteredArticles = articles.edges.filter(({ article }) => {
      return article.frontmatter.title
        .toLowerCase()
        .includes(filterTerm.toLowerCase())
    })

    setDisplayedArticles(filteredArticles)
  }, [filterTerm, articles])

  return (
    <Layout>
      <SEO title="Articles" />
      <input
        type="text"
        placeholder="Keyword Search"
        value={filterTerm}
        onChange={e => setFilterTerm(e.target.value)}
      />
      <section className="card-container">
        {displayedArticles.map(({ article: a }) => (
          <div key={a.id} className={"card"}>
            <div className={"card__content"}>
              <Link to={"/" + a.slug}>
                <img
                  className={"card__image"}
                  width="500"
                  height="250"
                  src="https://source.unsplash.com/random/500x250"
                  alt="image"
                ></img>
                <h3 className={"card__title"}>{a.frontmatter.title}</h3>
                <div className={"card__body"}>{a.excerpt}</div>
              </Link>
            </div>
            <div className="card__meta">
              <span>
                {["Godot", "C#"].map((e, i, a) => (
                  <React.Fragment key={i}>
                    <Link className="tag" to={"/tags/" + e.toLowerCase()}>
                      {e}
                    </Link>
                    {i !== a.length - 1 && "/"}
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
