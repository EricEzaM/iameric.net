import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useQueryParam, withDefault, ArrayParam } from "use-query-params"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import { getCategoryUrl } from "../utils/category-url-conversion"
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
      debugger
      let projectTags = project.frontmatter.tags.map(tag => getCategoryUrl(tag))
      return projectTags.some(t => selectedTags.includes(t)) || selectedTags === undefined || selectedTags.length === 0
    })

    setDisplayedProjects(filteredProjects)
  }, [selectedTags, projects])

  function onTagClicked(tag)
  {
    if (selectedTags.includes(tag))
    {
      let newTags = selectedTags.filter(t => t != tag)
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
      <aside>
        <ButtonGroup
          items={tags.group.map(t =>
          ({
            id: getCategoryUrl(t.fieldValue),
            text: t.fieldValue
          }))}
          selectedItems={selectedTags}
          onButtonClicked={id => onTagClicked(id)}
        />
      </aside>
      <section className="card-container">
        {displayedProjects.map(({ project: p }) => (
          <Card
            key={p.id}
            link={p.frontmatter.slug}
            title={p.frontmatter.title}
            body={p.excerpt}
            metaText={p.frontmatter.date}
            imgSrc={{ ...p.frontmatter.headerImage.childImageSharp.fluid, aspectRatio: 2 }}
            tagTitles={p.frontmatter.tags}
            tagLinks={p.frontmatter.tags}
          />
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
                  ...GatsbyImageSharpFluid_noBase64
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