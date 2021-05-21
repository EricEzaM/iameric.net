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

      <h3 className="page__subtitle">
        A mechanical engineer who loves programming.
      </h3>
      <div className="page__subtext">
        This website is a programming notebook of sorts - a place for me to
        document things I have learned that might be useful in the future, as
        well as showcase some of my projects. If someone out there finds what I
        create or write about useful too, then that is just an added bonus!
      </div>

      <section>
        <div className="section__title">
          <h1>Latest Articles</h1>
          <Link to={"articles"}>
            <h4>View All</h4>
          </Link>
        </div>
        <div className="card-container">
          {articles.edges.map(({ article }) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
      </section>

      <section>
        <div className="section__title">
          <h1>Latest Projects</h1>
          <Link to={"projects"}>
            <h4>View All</h4>
          </Link>
        </div>
        <div className="card-container">
          {projects.edges.map(({ project }) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section>
        <div className="section__title">
          <h1>Latest Snippets</h1>
          <Link to={"snippets"}>
            <h4>View All</h4>
          </Link>
        </div>
        <div className="card-container--vertical">
          {snippets.edges.map(({ snippet }) => (
            <SnippetCard snippet={snippet} key={snippet.id} />
          ))}
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
      filter: {
        frontmatter: { template: { eq: "article" }, published: { ne: false } }
      }
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
      filter: {
        frontmatter: { template: { eq: "snippet" }, published: { ne: false } }
      }
      limit: 3
    ) {
      edges {
        snippet: node {
          id
          ...SnippetCardInfo
        }
      }
    }
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { template: { eq: "project" }, published: { ne: false } }
      }
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
