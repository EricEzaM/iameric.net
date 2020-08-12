import React from "react"
import { Link } from "gatsby"

import TagList from "./tag-list"

const Card = ({ link, title, body, tags, props }) => {
  debugger
  return (
    <div className={"card"} {...props}>
      <div className={"card__content"}>
        <Link to={link}>
          <img
            className={"card__image"}
            width="500"
            height="250"
            src="https://source.unsplash.com/random/500x250"
            alt="TODO something"
          ></img>
          <h3 className={"card__title"}>{title}</h3>
          <div className={"card__body"}>{body}</div>
        </Link>
      </div>
      <div className="card__meta">
        <span>
          <TagList tags={tags} />
        </span>
      </div>
    </div>
  )
}

export default Card
