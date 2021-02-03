import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkList from "../components/link-list"
import { getUrlFriendlyName } from "../utils/category-url-conversion"

const IndexPage = () => {
  const { articles, snippets, projects } = useStaticQuery(query)

  return (
    <Layout>
      <SEO title="Home" />

      <h3 className="subtitle">
        A mechanical engineer who loves programming.
      </h3>
      <div>
        This website is a programming notebook of sorts - a place for me to document things I have learned that might be useful in the future, as well as showcase some of my projects. If someone out there finds what I create or write about useful too, then that is just an added bonus!
      </div>

      <section>
        <div className="section-title">
          <h2>Latest Articles</h2>
          <Link to={"articles"}>
            <h4>View All</h4>
          </Link>
        </div>
        <div className="card-container">
          {articles.edges.map(({ article: a }) => (
            <div className="card" key={a.id}>
              <Link to={`articles/${a.frontmatter.slug}`}>
                <Img
                  className={"card__image"}
                  fluid={{ ...a.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
                  alt={ `Image for ${a.frontmatter.title}` }
                />
                <h3 className={"card__title"}>{a.frontmatter.title}</h3>
                <div className={"card__body"}>{a.excerpt}</div>
              </Link>
              <time className={"card__date"}>{a.frontmatter.date}</time>
              <LinkList titles={a.frontmatter.tags} links={a.frontmatter.tags.map(t => "articles?tags=" + getUrlFriendlyName(t))} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Latest Projects</h2>
          <Link to={"projects"}>
            <h4>View All</h4>
          </Link>
        </div>
        <div className="card-container">
          {projects.edges.map(({ project: p }) => (
            <div className="card" key={p.id}>
              <Link to={`projects/${p.frontmatter.slug}`}>
                <Img
                  className={"card__image"}
                  fluid={{ ...p.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
                  alt={ `Image for ${p.frontmatter.title}` }
                />
                <h3 className={"card__title"}>{p.frontmatter.title}</h3>
                <div className={"card__body"}>{p.excerpt}</div>
              </Link>
              <time className={"card__date"}>{p.frontmatter.date}</time>
              <LinkList titles={p.frontmatter.tags} links={p.frontmatter.tags.map(t => "articles?tags=" + getUrlFriendlyName(t))} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Latest Snippets</h2>
          <Link to={"snippets"}>
            <h4>View All</h4>
          </Link>
        </div>
        <div className="card-container--vertical">
            {snippets.edges.map(
              ({ snippet: s }) => (
                <div className="card card--narrow" key={s.id}>
                  <Link
                    to={`snippets/${getUrlFriendlyName(s.frontmatter.category)}/${s.frontmatter.slug}`}
                    className="card__content card__content--vertical"
                  >
                  <Img
                    className={"card__image--vertical"}
                    fluid={{ ...s.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
                    alt={ `Image for ${s.frontmatter.title}` }
                  />
                  <div>
                    <h3 className={"card__title card__title--vertical"}>{s.frontmatter.title}</h3>
                    <time className={"card__date"}>{s.frontmatter.date}</time>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

const query = graphql`
  query {
    articles: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "article" } } }
      limit: 3
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
    snippets: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "snippet" } } }
      limit: 3
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
    projects: allMarkdownRemark (
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "project" } } }
      limit: 3
    ) {
      edges {
        project: node {
          id
            frontmatter {
              title
              slug
              tags
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
  }
`