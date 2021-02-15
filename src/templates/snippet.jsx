import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import LinkList from "../components/link-list"
import { getUrlFriendlyName } from "../utils/category-url-conversion"

const Snippet = ({ data }) => {
  const post = data.snippet
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="article">
        <div className="article__header">
          <h1>{post.frontmatter.title}</h1>
          <div className="article__meta">
            <LinkList
              titles={[post.frontmatter.category]}
              links={["snippets?category=" + getUrlFriendlyName(post.frontmatter.category)]}
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
