import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ProjectsPage = () =>
{
  const { projects } = useStaticQuery(query)

  return (
    <Layout>
      <SEO title="Projects" />
      <section className="card-container">
        {projects.edges.map(({ project: p }) => (
          <Card
            key={p.id}
            link={p.frontmatter.slug}
            title={p.frontmatter.title}
            body={p.excerpt}
            metaText={p.frontmatter.date}
            imgSrc={{ ...p.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
            tagTitles={p.frontmatter.tags}
            tagLinks={p.frontmatter.tags}
          />
        ))}
      </section>
    </Layout>
  )
}

export default ProjectsPage

const query = graphql`
  query {
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "project" } } }
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
                  ...GatsbyImageSharpFluid_noBase64
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