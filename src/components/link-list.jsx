import React from "react"
import { Link } from "gatsby"

const LinkList = ({ titles, links }) => {
  return (
    <>
      {titles && titles.length === links.length && (
        <span>
          {titles.map((e, i, arr) => (
            // React fragment = <>, </>
            <React.Fragment key={i}>
              <Link className="link-list-link" to={"/" + links[i]}>
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

export default LinkList
