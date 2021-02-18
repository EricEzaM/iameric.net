import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

const SnippetCard = ({ snippet: s }) =>
{
  return (
    <div className="card card--narrow">
      <Link
        to={"/snippets/" + s.frontmatter.slug}
        className="card__content card__content--vertical"
      >
        <Img
          className={"card__image--vertical"}
          fluid={{ ...s.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
          alt={ `Image for ${s.frontmatter.title}` }
        />
        <div>
          <h3 className={"card__title card__title--vertical"}>{s.frontmatter.title}</h3>
          <time className={"card__date"}>{s.frontmatter.date}</time>
        </div>
      </Link>
    </div>
  )
}

export default SnippetCard

export const SnippetCardInfoFragment = graphql`
  fragment SnippetCardInfo on MarkdownRemark {
    frontmatter {
      title
      slug
      category
      headerImage {
        childImageSharp {
          fluid(quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
      date(formatString: "MMMM Do, YYYY")
    }
  }
`