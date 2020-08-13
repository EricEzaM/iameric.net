import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Snippet = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="article">
        <div className="article__header">
          <h1>{post.frontmatter.title}</h1>
          <div className="article__meta">
            <time>Published {post.frontmatter.date}</time>
          </div>
        </div>
        <div
          className="article__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
      </div>
    </Layout>
  )
}

export default Snippet

export const query = graphql`
  query($slug: String!, $category: String!) {
    snippets: markdownRemark(
      frontmatter: { slug: { eq: $slug }, category: { eq: $category } }
    ) {
      html
      frontmatter {
        title
        date(formatString: "dddd MMMM DD, YYYY")
      }
    }
  }
`
