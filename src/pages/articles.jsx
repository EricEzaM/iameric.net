import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ArticlesPage = () => {
  return (
    <Layout>
      <SEO title="Articles" />
      <section className="card-container">
        {[1, 2, 3, 4, 5, 6].map(e => (
          <div className={"card"}>
            <div className={"card__content"}>
              <h3 className={"card__title"}>Articles</h3>
              <div className={"card__body"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                obcaecati adipisci inventore nulla vero perferendis dolorem
                provident reprehenderit minima. Facere quos sit fugiat mollitia
                magni minima quasi optio minus delectus!
              </div>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default ArticlesPage
