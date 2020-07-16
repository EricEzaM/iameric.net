import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const headerImage = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Img fluid={headerImage.image.childImageSharp.fluid} alt="header image" />
      <nav>
        <ul>
          <li>Articles</li>
          <li>Snippets</li>
          <li>Projects</li>
        </ul>
      </nav>
      <div></div>
    </Layout>
  )
}

export default IndexPage
