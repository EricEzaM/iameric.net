import React, { useState, useEffect, useRef } from "react"

import CaretDownIcon from "../images/svg/caret-down.svg"
import CaretUpIcon from "../images/svg/caret-up.svg"
import useOnClickOutside from "../hooks/useOnClickOutside"

const Dropdown = ({
  title,
  items,
  multiselect = false,
  onSelectionChanged = items => {},
  displayFunction = item => {
    return item.value
  },
  defaultSelection = [],
}) => {
  // Ref to the element for which we want to detect outside clicks
  const ref = useRef()
  useOnClickOutside(ref, () => toggle(false))
  // State
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState(defaultSelection)

  // Refresh selected items if the selection changes
  useEffect(() => {
    setSelectedItems(defaultSelection)
  }, [defaultSelection])

  // Toggles the dropdown to be showing or not
  function toggle(open) {
    setOpen(open)
  }

  // Handles clicking on an item - adding or removing
  // it from selected items list and updating the state
  function onClickItem(item) {
    let newSelectedItems = []
    if (selectedItems.map(i => i.id).includes(item.id)) {
      newSelectedItems = selectedItems.filter(i => i.id !== item.id)
    } else {
      newSelectedItems = [...selectedItems, item]
    }
    setSelectedItems(newSelectedItems)
    onSelectionChanged(newSelectedItems)
  }

  // Checks whether an item is selected
  function isItemSelected(item) {
    return selectedItems.map(i => i.id).includes(item.id)
  }

  return (
    <div className="dd-wrapper" ref={ref}>
      <button
        className={["dd-header", !open ? "dd-header--closed" : ""].join(" ")}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--italic">
            {/* Determine how items should be displayed based on the number selected */}
            {/* TODO: Parameterise the limits? (> 0, < 3, etc) */}
            {selectedItems.length > 0
              ? selectedItems.length < 3
                ? selectedItems.map(item => displayFunction(item)).join(", ")
                : `${selectedItems.length} items`
              : title}
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

export default Dropdown
