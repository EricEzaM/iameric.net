import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import LinkList from "./link-list"

const Card = ({
  link,
  title,
  metaText,
  body,
  imgSrc,
  vertical = false,
  tagTitles = [],
  tagLinks = [],
}) => {
  // Wide list / multiple columns
  if (!vertical) {
    return (
      <div className={"card"}>
        <div className={"card__content"}>
          <Link to={link}>
            {imgSrc && (
              <Img
                className={"card__image"}
                fluid={imgSrc}
                alt="TODO something"
                loading="eager"
              />
            )}
            {title && <h3 className={"card__title"}>{title}</h3>}
            {body && <div className={"card__body"}>{body}</div>}
          </Link>
        </div>
        <div className="card__meta">
          {metaText && <div className={"card__meta-text"}>{metaText}</div>}
          {tagTitles && tagTitles.length > 0 && (
            <div>
              <LinkList titles={tagTitles} links={tagLinks} />
            </div>
          )}
        </div>
      </div>
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
            {tagTitles && tagTitles.length > 0 && (
              <div>
                <LinkList titles={tagTitles} links={tagLinks} />
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
