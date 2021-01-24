import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Nav = () => {
  const headerImage = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  return (
    <nav className="nav">
      <Link to="/">
        <Img
          style={{ width: "40%", margin: "auto" }}
          fluid={headerImage.image.childImageSharp.fluid}
          alt="header"
          loading="eager"
        />
      </Link>

      <ul className="nav__list">
        {["Articles", "Snippets", "Projects", "About"].map(e => (
          <li key={e.toLowerCase()} className="nav__item">
            <Link activeClassName="is-active" to={`/${e.toLowerCase()}`}>
              {e}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
