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
      <Img
        style={{ width: "50%", margin: "auto" }}
        fluid={headerImage.image.childImageSharp.fluid}
        alt="header image"
      />
      <nav className={"nav"}>
        <ul className={"nav__list"}>
          <li className={"nav__item"}>Articles</li>
          <li className={"nav__item"}>Snippets</li>
          <li className={"nav__item"}>Projects</li>
        </ul>
      </nav>
      <div></div>
    </Layout>
  )
}

export default IndexPage
