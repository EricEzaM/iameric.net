import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import { useQueryParam, withDefault, ArrayParam } from "use-query-params"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LinkList from "../components/link-list"
import { getUrlFriendlyName } from "../utils/category-url-conversion"
import ButtonGroup from "../components/button-group"

const ProjectsPage = () =>
{
  const { projects, tags } = useStaticQuery(query)

  const [displayedProjects, setDisplayedProjects] = useState(projects.edges)
  const [selectedTags, setSelectedTags] = useQueryParam(
    "tags",
    withDefault(ArrayParam, [])
  )

  useEffect(() => {
    let filteredProjects = projects.edges.filter(({ project }) =>
    {
      let projectTags = project.frontmatter.tags.map(tag => getUrlFriendlyName(tag))
      return projectTags.some(t => selectedTags.includes(t)) || selectedTags === undefined || selectedTags.length === 0
    })

    setDisplayedProjects(filteredProjects)
  }, [selectedTags, projects])

  function onTagClicked(tag)
  {
    if (selectedTags.includes(tag))
    {
      let newTags = selectedTags.filter(t => t !== tag)
      if (newTags.length > 0) {
        setSelectedTags(newTags)
      }
      else {
        setSelectedTags(undefined)
      }
    }
    else
    {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <Layout>
      <SEO title="Projects" />
      <aside className="filters-container">
        <ButtonGroup
          items={tags.group.map(t =>
          ({
            id: getUrlFriendlyName(t.fieldValue),
            text: t.fieldValue
          }))}
          selectedItems={selectedTags}
          onButtonClicked={id => onTagClicked(id)}
        />
      </aside>
      <section className="card-container">
        {displayedProjects.map(({ project: p }) => (
          <div className="card" key={p.id}>
            <Link to={p.frontmatter.slug}>
              <Img
                className={"card__image"}
                fluid={{ ...p.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
                alt={`Image for ${p.frontmatter.title}`}
                imgStyle={{
                  objectPosition: "top center"
                }}
              />
              <h3 className={"card__title"}>{p.frontmatter.title}</h3>
              <div className={"card__body"}>{p.excerpt}</div>
            </Link>
            <time className={"card__date"}>{p.frontmatter.date}</time>
            <LinkList titles={p.frontmatter.tags} links={p.frontmatter.tags.map(t => "projects?tags=" + getUrlFriendlyName(t))} />
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default ProjectsPage

const query = graphql`
  query {
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "project" } } }
    ) {
      edges {
        project: node {
          id
          frontmatter {
            title
            slug
            tags
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
      }
    }
    tags: allMarkdownRemark (
      filter: { frontmatter: { template: {eq : "project"} } } 
    ) {
      group(field: frontmatter___tags){
        fieldValue
        totalCount
      }
    }
  }
`