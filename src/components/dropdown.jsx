import React, { useState, useEffect } from "react"
import onClickOutside from "react-onclickoutside"

import CaretDownIcon from "../images/caret-down.svg"
import CaretUpIcon from "../images/caret-up.svg"

const Dropdown = ({
  title,
  items,
  multiselect = false,
  onSelectionChanged = items => {},
  displayFunction = item => {
    return item.value
  },
}) => {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])

  // Handles the state change in selectedItems
  // and passes the new values to the parent. Done in
  // useEffect to avoid issues with render order which would
  // arise if onSelectionChanged was called immediately after
  // setSelectedItems
  useEffect(() => {
    onSelectionChanged(selectedItems)
  }, [selectedItems])

  // Toggles the dropdown to be showing or not
  function toggle(open) {
    setOpen(open)
  }

  // Handles clicking on an item - adding or removing
  // it from selected items list and updating the state
  function onClickItem(item) {
    let newSelectedItems = []
    if (selectedItems.map(i => i.id).includes(item.id)) {
      newSelectedItems = selectedItems.filter(i => i.id != item.id)
    } else {
      newSelectedItems = [...selectedItems, item]
    }
    setSelectedItems(newSelectedItems)
  }

  Dropdown.handleClickOutside = () => toggle(false)

  // Checks whether an item is selected
  function isItemSelected(item) {
    return selectedItems.map(i => i.id).includes(item.id)
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
          {open && <CaretUpIcon />}
          {!open && <CaretDownIcon />}
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

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
}

export default onClickOutside(Dropdown, clickOutsideConfig)
