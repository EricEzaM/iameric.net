import React from "react"
import { Link } from "gatsby"

import LinkList from "./link-list"
import { getCategoryUrl } from "../utils/category-url-conversion"

const Card = ({
  link,
  title,
  metaText,
  body,
  tags,
  imgSrc,
  vertical = false,
}) => {
  // Wide list / multiple columns
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
              <LinkList
                titles={tags}
                links={tags.map(e => "tag/" + getCategoryUrl(e))}
              />
            </div>
          )}
        </div>
      </Link>
    )
  }
  // Vertical list / one column
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
                <LinkList
                  titles={tags}
                  links={tags.map(e => "tag/" + getCategoryUrl(e))}
                />
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
