import { useEffect } from "react"

// Based on implementation from https://usehooks.com/
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {
      // Do nothing if clicking ref element or its children
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    // Add event listeners to the page on render
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      // Remove them on cleanup
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside
