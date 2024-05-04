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
    <div className="fixed top-[25%] left-[35%]">
      {chatOpen && <ChatSection />}
    </div>
  )
}

export default PlasmoOverlay
