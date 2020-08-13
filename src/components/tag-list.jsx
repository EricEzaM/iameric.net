import React from "react"
import { Link } from "gatsby"

const TagList = ({ tags }) => {
  return (
    <>
      {tags && (
        <span>
          {tags.map((e, i, arr) => (
            // React fragment = <>, </>
            <React.Fragment key={i}>
              <Link className="tag" to={"/tags/" + e.toLowerCase()}>
                {e}
              </Link>
              {i !== arr.length - 1 && <span> / </span>}
            </React.Fragment>
          ))}
        </span>
      )}
    </>
  )
}

export default TagList
