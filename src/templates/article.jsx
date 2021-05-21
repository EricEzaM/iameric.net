import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import Layout from "../components/layout"
import LinkList from "../components/link-list"
import { getUrlFriendlyName } from "../utils/category-url-conversion"

const Article = ({ data }) => {
  const post = data.post
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="post">
        <div className="post__header">
          <h1>{post.frontmatter.title}</h1>
          <div className="post__meta">
            <LinkList
              titles={post.frontmatter.tags}
              links={post.frontmatter.tags.map(
                e => "articles?tags=" + getUrlFriendlyName(e)
              )}
            />
            <time>{post.frontmatter.date}</time>
          </div>
          <Img
            fluid={post.frontmatter.headerImage.childImageSharp.fluid}
            imgStyle={{
              objectPosition: "top center",
            }}
          />
        </div>
        <div
          className="post__body"
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
