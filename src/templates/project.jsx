import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Layout from "../components/layout"
import LinkList from "../components/link-list"
import ExternalLinkIcon from "../images/svg/external-link.svg"
import { getUrlFriendlyName } from "../utils/category-url-conversion"

const Project = ({ data }) => {
  const post = data.post
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="article">
        <div className="article__header">
          <h1>{post.frontmatter.title}</h1>
          <div className="project__links">
            {post.frontmatter.url != null &&
              <a href={post.frontmatter.url}>
                Website
                <ExternalLinkIcon style={{ fill: "#ffffff" }} />
              </a>
            }
            {post.frontmatter.github != null &&
              <a href={post.frontmatter.github}>
                GitHub
              <ExternalLinkIcon style={{ fill: "#ffffff" }} />
              </a>
            }
          </div>
          <div className="article__meta">
            <LinkList
              titles={post.frontmatter.tags}
              links={post.frontmatter.tags.map(e => "projects?tags=" + getUrlFriendlyName(e))}
            />
            <time>{post.frontmatter.date}</time>
          </div>
          <Img
            fluid={post.frontmatter.headerImage.childImageSharp.fluid}
            imgStyle={{
              objectPosition: "top center"
            }}
          />
        </div>
        <div
          className="article__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
      </div>
    </Layout>
  )
}

export default Project

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug }, template: { eq: "project"} }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM YYYY")
        tags
        url,
        github,
        headerImage {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      timeToRead
    }
  }
`
