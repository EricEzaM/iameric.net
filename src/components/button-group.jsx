import React from "react"

/**
 * @callback buttonClickedCallback
 * @param {string} Id The unique Id of the items which was clicked
 */

/**
 * @param {object} props Component Properties
 * @param {object} props.items Items of which a button will be created for each
 * @param {string} props.items.id A unique identifier for each button item
 * @param {string} props.items.text The text to be displayed on then button
 * @param {Array} props.selectedItems The buttons which will be shown as active
 * @param {buttonClickedCallback} props.onSelectionChanged Callback function after change to the selection occurs
 */
const ButtonGroup = ({
  items = {
    id: "",
    text: "",
  },
  selectedItems = [""],
  onButtonClicked = id => {},
}) => {
  return (
    <div className="button-group">
      {items.map(({ id, text }) => (
        <button
          className={[
            "button-group__item",
            selectedItems.includes(id) ? "active" : "",
          ].join(" ")}
          key={text}
          onClick={e => onButtonClicked(id)}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
