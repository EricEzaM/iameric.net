import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useQueryParam, withDefault, ArrayParam } from "use-query-params"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { getUrlFriendlyName } from "../utils/category-url-conversion"
import ButtonGroup from "../components/button-group"
import ProjectCard from "../components/cards/project-card";

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
        {displayedProjects.map(({ project }) => (
          <ProjectCard project={ project } key={ project.id }/>
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
          ...ProjectCardInfo
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