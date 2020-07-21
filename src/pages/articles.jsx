import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const ArticlesPage = () => {
  return (
    <Layout>
      <SEO title="Articles" />
      <section className="card-container">
        {[1, 2, 3, 4, 5, 6].map(e => (
          <div className={"card"}>
            <div className={"card__content"}>
              <Link to={"/" + e.toString()}>
                <img
                  className={"card__image"}
                  width="500"
                  height="250"
                  src="https://source.unsplash.com/random/500x250"
                  alt="image"
                ></img>
                <h3 className={"card__title"}>Big long article title</h3>
                <div className={"card__body"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                  obcaecati adipisci inventore nulla vero perferendis dolorem
                  provident reprehenderit minima. Facere quos sit fugiat
                  mollitia magni minima quasi optio minus delectus!
                </div>
              </Link>
            </div>
            <div className="card__meta">
              <span>
                {["Godot", "C#"].map((e, i, a) => (
                  <>
                    <Link className="tag" to={"/tags/" + e.toLowerCase()}>
                      {e}
                    </Link>
                    {i !== a.length - 1 && "/"}
                  </>
                ))}
              </span>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default ArticlesPage
