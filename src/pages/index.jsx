import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleCard from "../components/cards/article-card"
import ProjectCard from "../components/cards/project-card"
import SnippetCard from "../components/cards/snippet-card"

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
          {articles.edges.map(({ article }) => (
            <ArticleCard article={article} key={ article.id }/>
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
          {projects.edges.map(({ project }) => (
            <ProjectCard project={project} key={ project.id }/>
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
              ({ snippet }) => (
                <SnippetCard snippet={snippet} key={ snippet.id }/>
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
          ...ArticleCardInfo
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
          ...SnippetCardInfo
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
          ...ProjectCardInfo
        }
      }
    }
  }
`