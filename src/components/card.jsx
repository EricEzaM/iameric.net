import React from "react"
import { Link } from "gatsby"

import TagList from "./tag-list"

const Card = ({
  link,
  title,
  metaText,
  body,
  tags,
  imgSrc,
  vertical = false,
}) => {
  if (!vertical) {
    return (
      <Link to={link} className={"card"}>
        <div className={"card__content"}>
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
        </div>
        <div className="card__meta">
          {metaText && <div className={"card__meta-text"}>{metaText}</div>}
          {tags && tags.length > 0 && (
            <div>
              <TagList tags={tags} />
            </div>
          )}
        </div>
      </Link>
    )
  }
  return (
    <Link to={link} className={"card--vertical"}>
      {imgSrc && (
        <img
          className={"card__image--vertical"}
          width="250"
          height="250"
          src={imgSrc}
          alt="TODO something"
        />
      )}
      <div className={"card__content--vertical"}>
        <div>
          {title && <h3 className={"card__title"}>{title}</h3>}
          <div className="card__meta--vertical">
            {metaText && <div className={"card__meta-text"}>{metaText}</div>}
            {tags && tags.length > 0 && (
              <div>
                <TagList tags={tags} />
              </div>
            )}
          </div>
        </div>
        {body && <div className={"card__body"}>{body}</div>}
      </div>
    </Link>
  )
}

export default Card
