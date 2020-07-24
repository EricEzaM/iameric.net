import React, { useState } from "react"

const Dropdown = ({
  title,
  items,
  multiselect = false,
  onSelectionChanged,
  displayFunction = item => {
    return item.value
  },
}) => {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  function toggle(open) {
    setOpen(open)
  }

  function onClickItem(item) {
    let newSelectedItems = []
    if (selectedItems.includes(item)) {
      newSelectedItems = selectedItems.filter(i => i.id != item.id)
    } else {
      newSelectedItems = [...selectedItems, item]
    }
    // Send event to parent before settings state and triggering refresh
    onSelectionChanged(newSelectedItems)
    setSelectedItems(newSelectedItems)
  }

  function isItemSelected(item) {
    return selectedItems.includes(item)
  }

  return (
    <div className="dd-wrapper">
      <button
        className={["dd-header", !open ? "dd-header--closed" : ""].join(" ")}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--italic">
            {selectedItems.length > 0 ? `${selectedItems.length} items` : title}
          </p>
        </div>
        <div className="dd-header__action">
          <p>{open ? "Close" : "Open"}</p>
        </div>
      </button>
      {open && (
        <ul className="dd-list">
          {items.map((item, idx) => (
            <li key={idx}>
              <button
                type="button"
                onClick={() => onClickItem(item)}
                className={isItemSelected(item) ? "is-active" : ""}
              >
                <span>{displayFunction(item)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
