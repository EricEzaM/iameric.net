import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import LinkList from "../link-list"
import { getUrlFriendlyName } from "../../utils/category-url-conversion"

const ArticleCard = ({ article: a }) =>
{
  return (
    <div className="card">
      <Link to={"/articles/" + a.frontmatter.slug}>
        <Img
          className={"card__image"}
          fluid={{ ...a.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
          alt={`Image for ${a.frontmatter.title}`}
          imgStyle={{
            objectPosition: "top center"
          }}
        />
        <h3 className={"card__title"}>{a.frontmatter.title}</h3>
        <div className={"card__body"}>{a.excerpt}</div>
      </Link>
      <time className={"card__date"}>{a.frontmatter.date}</time>
      <LinkList titles={a.frontmatter.tags} links={a.frontmatter.tags.map(t => "articles?tags=" + getUrlFriendlyName(t))} />
    </div>
  )
}

export default ArticleCard

export const ArtcileCardInfoFragment = graphql`
  fragment ArticleCardInfo on MarkdownRemark {
    frontmatter {
      title
      tags
      slug
      headerImage {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      date(formatString: "MMMM Do, YYYY")
    }
    excerpt(pruneLength: 150)
  }
`