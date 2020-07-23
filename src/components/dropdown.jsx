import React, { useState } from "react"

const Dropdown = ({ title, items, multiselect = false }) => {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  function toggle(open) {
    setOpen(open)
  }

  function onClickItem(item) {
    if (selectedItems.includes(item)) {
      let selectedItemAfterRemoval = selectedItems.filter(i => i.id != item.id)
      setSelectedItems(selectedItemAfterRemoval)
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  function isItemSelected(item) {
    return selectedItems.includes(item)
  }

  function getSelectedItemsDisplay() {
    if (selectedItems.length > 2) {
      var commaSeparatedItems = selectedItems
        .slice(0, 2)
        .map(item => item.value)
        .join(", ")

      commaSeparatedItems += ` and ${
        selectedItems[selectedItems.length - 1].value
      }.`

      return commaSeparatedItems
    }
    return selectedItems.map(item => item.value).join(" and ") + "."
  }

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className={["dd-header", !open ? "dd-header--closed" : ""].join(" ")}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--italic">
            {selectedItems.length > 0
              ? "Filtering by " + getSelectedItemsDisplay()
              : "Filter by Tags..."}
          </p>
        </div>
        <div className="dd-header__action">
          <p>{open ? "Close" : "Open"}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item, idx) => (
            <li key={idx}>
              <button type="button" onClick={() => onClickItem(item)}>
                <span>{item.value}</span>
                <span>{isItemSelected(item) ? "Yeppers" : "Nupp"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
