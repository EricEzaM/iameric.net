import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import TagList from "../components/tag-list"

const Article = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="article">
        <div className="article__header">
          <h1>{post.frontmatter.title}</h1>
          <div className="article__meta">
            <time>Published {post.frontmatter.date}</time>
            <p>{post.timeToRead} minute read</p>
          </div>
          <div className="article__tags">
            <TagList tags={post.frontmatter.tags} />
          </div>
          <Img fluid={post.frontmatter.headerImage.childImageSharp.fluid} />
        </div>
        <div
          className="article__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
      </div>
    </Layout>
  )
}

export default Article

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd MMMM DD, YYYY")
        tags
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
