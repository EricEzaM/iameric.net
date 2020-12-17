import React from "react"
import { Link } from "gatsby"

import TagList from "./tag-list"

const Card = ({ link, title, metaText, body, tags, imgSrc, className, ...props }) => {
  return (
    <div {...props} className={["card", className].join(" ")}>
      <div className={"card__content"}>
        <Link to={link}>
          {imgSrc && (
            <img
              className={"card__image"}
              width="500"
              height="250"
              src={imgSrc}
              alt="TODO something"
            />
          )}
          {title && <h3 className={"card__title"}>{title}</h3>}
          {body && <div className={"card__body"}>{body}</div>}
        </Link>
      </div>
      <div className="card__meta">
        {metaText && <div className={"card__meta-text"}>{metaText}</div>}
        {tags && tags.length > 0 && (
          <div>
            <TagList tags={tags} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
