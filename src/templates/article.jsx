import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import TagList from "../components/tag-list"

const Article = ({ data }) => {
  const post = data.post
  return (
    <Layout>
      <div className="article">
        <div className="article__header">
          <h1>{post.frontmatter.title}</h1>
          <div className="article__meta">
            <TagList tags={post.frontmatter.tags} />
            <time>Published {post.frontmatter.date}</time>
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
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd MMMM Do, YYYY")
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
