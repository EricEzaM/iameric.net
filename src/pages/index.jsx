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
        style={{ width: "40%", margin: "auto" }}
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
      <section className={"card-container"}>
        {[1, 2, 3].map(() => (
          <div className={"card"}>
            <div className={"card__content"}>
              <img
                className={"card__image"}
                src="https://source.unsplash.com/random/200x200"
              ></img>
              <h3 className={"card__title"}>Title</h3>
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
      <div></div>
    </Layout>
  )
}

export default IndexPage
