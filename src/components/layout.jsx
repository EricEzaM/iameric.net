/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import "../styles/main.scss"
import Nav from "./nav"
import MailIcon from "../images/svg/mail.svg"
import GatsbyIcon from "../images/svg/gatsby.svg"
import GithubIcon from "../images/svg/github.svg"

const Layout = ({ children }) => {
  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1024,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <Nav />
        <main>{children}</main>
        <footer>
          <div className="footer-links">
            <a href="mailto:eric@iameric.net" title="Send me an email">
              <MailIcon/>
            </a>
            <a href="https://github.com/EricEzaM" title="View my Github">
              <GithubIcon/>
            </a>
            <a href="https://www.gatsbyjs.com/" title="Built with GatsbyJS">
              <GatsbyIcon/>
            </a>
          </div>
          © {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
