import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"
import myImage from "url:../image.png"

import { ChatSection } from "~features/ChatModal"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const addSwitchImage = () => {
      const contentEditableDiv = document.querySelector(
        ".msg-form__contenteditable"
      )
      const contentEditableContainer = document.querySelector(
        "msg-form__msg-content-container"
      )

      if (contentEditableDiv) {
        const switchImage = document.createElement("img")

        switchImage.src = myImage
        switchImage.style.height = "15px"
        switchImage.style.width = "15px"
        switchImage.style.position = "absolute"
        switchImage.style.bottom = "8px"
        switchImage.style.right = "8px"
        switchImage.style.cursor = "pointer"
        switchImage.style.background = "white"
        /* Vector */

        const handleSwitchClick = () => {
          setChatOpen(true)
        }

        switchImage.addEventListener("click", handleSwitchClick)

        const handleInputFocus = () => {
          contentEditableDiv.appendChild(switchImage)
        }

        const handleInputBlur = () => {
          switchImage.remove()
        }

        contentEditableDiv.addEventListener("focus", handleInputFocus)
        contentEditableDiv.addEventListener("blur", handleInputBlur)

        clearInterval(intervalId)
      }
    }

    const intervalId = setInterval(addSwitchImage, 500)

    return () => clearInterval(intervalId)
  }, [chatOpen])

  return (
    <div className="flex justify-center items-center h-screen">
      {chatOpen && (
        <div>
          {/* <div
            style={{ textAlign: "end", cursor: "pointer" }}
            onClick={() => setChatOpen(false)}>
            Close
          </div> */}
          <ChatSection />
        </div>
      )}
    </div>
  )
}

export default PlasmoOverlay
