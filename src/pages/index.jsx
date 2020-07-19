import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useState } from "react"

const sections = {
  ARTICLES: 0,
  SNIPPETS: 1,
  PROJECTS: 2,
}

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

  const [activeSection, setActiveSection] = useState(sections.ARTICLES)
  const [disappearingSection, setDisappearingSection] = useState(-1)
  const [appearingSection, setAppearingSection] = useState(-1)

  function onNavClick(section) {
    if (section !== activeSection) {
      setDisappearingSection(activeSection)
      setAppearingSection(section)
    }
  }

  function onAnimationEnd(animEvent) {
    if (animEvent.animationName === "appearing") {
      setAppearingSection(-1)
    } else if (animEvent.animationName === "disappearing") {
      setActiveSection(appearingSection)
      setDisappearingSection(-1)
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Img
        style={{ width: "40%", margin: "auto" }}
        fluid={headerImage.image.childImageSharp.fluid}
        alt="header image"
      />
      <nav className={"nav"}>
        <ul className={"nav__list"}>
          <li
            className={[
              "nav__item",
              activeSection === sections.ARTICLES ? "is-active" : null,
            ].join(" ")}
            onClick={() => onNavClick(sections.ARTICLES)}
          >
            Articles
          </li>
          <li
            className={[
              "nav__item",
              activeSection === sections.SNIPPETS ? "is-active" : null,
            ].join(" ")}
            onClick={() => onNavClick(sections.SNIPPETS)}
          >
            Snippets
          </li>
          <li
            className={[
              "nav__item",
              activeSection === sections.PROJECTS ? "is-active" : null,
            ].join(" ")}
            onClick={() => onNavClick(sections.PROJECTS)}
          >
            Projects
          </li>
        </ul>
      </nav>
      {/* Articles */}
      <section
        className={[
          "card-container",
          activeSection === sections.ARTICLES ? "is-active" : null,
          appearingSection === sections.ARTICLES ? "appearing" : null,
          disappearingSection === sections.ARTICLES ? "disappearing" : null,
        ].join(" ")}
        onAnimationEnd={animEvent => onAnimationEnd(animEvent)}
      >
        {[1, 2, 3].map(() => (
          <div className={"card"}>
            <div className={"card__content"}>
              <img
                className={"card__image"}
                src="https://source.unsplash.com/random/200x200"
              ></img>
              <h3 className={"card__title"}>Articles</h3>
              <div className={"card__body"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                obcaecati adipisci inventore nulla vero perferendis dolorem
                provident reprehenderit minima. Facere quos sit fugiat mollitia
                magni minima quasi optio minus delectus!
              </div>
            </div>
          </div>
        ))}
        <div className={"card-container__footer"}>
          <Link className={"card-container__button"} to="/">
            See All
          </Link>
        </div>
      </section>
      {/* Snippets */}
      <section
        className={[
          "card-container",
          activeSection === sections.SNIPPETS ? "is-active" : null,
          appearingSection === sections.SNIPPETS ? "appearing" : null,
          disappearingSection === sections.SNIPPETS ? "disappearing" : null,
        ].join(" ")}
        onAnimationEnd={animEvent => onAnimationEnd(animEvent)}
      >
        {[1, 2, 3].map(() => (
          <div className={"card"}>
            <div className={"card__content"}>
              <img
                className={"card__image"}
                src="https://source.unsplash.com/random/200x200"
              ></img>
              <h3 className={"card__title"}>Snippets</h3>
              <div className={"card__body"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                obcaecati adipisci inventore nulla vero perferendis dolorem
                provident reprehenderit minima. Facere quos sit fugiat mollitia
                magni minima quasi optio minus delectus!
              </div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default IndexPage
