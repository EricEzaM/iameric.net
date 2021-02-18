import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import LinkList from "../link-list"
import { getUrlFriendlyName } from "../../utils/category-url-conversion"

const ProjectCard = ({ project: p }) =>
{
  return (
    <div className="card">
      <Link to={"/projects/" + p.frontmatter.slug}>
        <Img
          className={"card__image"}
          fluid={{ ...p.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
          alt={`Image for ${p.frontmatter.title}`}
          imgStyle={{
            objectPosition: "top center"
          }}
        />
        <h3 className={"card__title"}>{p.frontmatter.title}</h3>
        <div className={"card__body"}>{p.frontmatter.blurb}</div>
      </Link>
      <time className={"card__date"}>{p.frontmatter.date}</time>
      <LinkList titles={p.frontmatter.tags} links={p.frontmatter.tags.map(t => "projects?tags=" + getUrlFriendlyName(t))} />
    </div>
  )
}

export default ProjectCard

export const ProjectCardInfoFragment = graphql`
  fragment ProjectCardInfo on MarkdownRemark {
    frontmatter {
      title
      slug
      tags
      blurb
      date(formatString: "MMMM YYYY")
      headerImage {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`