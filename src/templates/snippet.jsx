import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import LinkList from "../components/link-list"

const Snippet = ({ data }) => {
  const post = data.snippet
  return (
    <Layout>
      <div className="article">
        <div className="article__header">
          <h1>{post.frontmatter.title}</h1>
          <div className="article__meta">
            <LinkList
              tags={[post.frontmatter.category]}
              urlPartName="snippet-category"
            />
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
  query($slug: String!) {
    snippet: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
        date(formatString: "dddd MMMM Do, YYYY")
      }
    }
  }
`
