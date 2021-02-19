import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import CaretRightIcon from "../images/svg/caret-right.svg";
import CaretDownIcon from "../images/svg/caret-down.svg";

const Nav = () => {
  const headerImage = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "img/logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  const [menuShown, setMenuShown] = useState(false)
  
  return (
    <nav className="nav">
      <Link to="/">
        <Img
          className="nav__image"
          fluid={headerImage.image.childImageSharp.fluid}
          alt="header"
          loading="eager"
        />
      </Link>

      <button className="nav__title" onClick={e => setMenuShown(!menuShown)}>
        {/* Offset the icon by 24 px so the "menu" still gets centered*/}
        {!menuShown && <CaretRightIcon style={{marginLeft:"-24px"}}/>}
        { menuShown && <CaretDownIcon style={{marginLeft:"-24px"}}/>}
        Menu
      </button>
      <ul className={`nav__list ${menuShown ? "nav__list--active" : ""}`}>
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
