import React, { useRef, useState } from "react"
import { CiPaperplane } from "react-icons/ci"
import { TfiArrowDown, TfiReload } from "react-icons/tfi"

export const ChatSection = () => {
  const [messages, setMessages] = useState([])
  const [reply, setReply] = useState([
    {
      content:
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask",
      isBotResponse: true
    }
  ])
  const textInputRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSendMessage = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const text = textInputRef.current.value.trim()

    if (text) {
      setMessages([...messages, { content: text, isBotResponse: false }])

      textInputRef.current.value = ""
    }
    setSubmitted(true)
  }

  const handleInsertText = () => {
    const contentEditableDiv = document.querySelector(
      ".msg-form__contenteditable p"
    )
    const placeholder = document.querySelector(".msg-form__placeholder")
    if (contentEditableDiv) {
      const textToInsert = reply[0].content
      contentEditableDiv.innerHTML = ""
      contentEditableDiv.textContent = textToInsert
    }

    if (placeholder) {
      placeholder.setAttribute("data-placeholder", "")
    }
  }

  return (
    <div
      className="relative bg-white overflow-auto p-4 h-[250px] w-[420px] overflow-x-hidden shadow-lg"
      onClick={(e) => e.stopPropagation()}>
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex items-center justify-end overflow-auto">
            {!message.isBotResponse && (
              <div className="mr-2 ml-6 py-2 mb-2 px-3 text-black bg-blue-100 rounded-xl">
                {message.content}
              </div>
            )}
          </div>

          <div className="flex items-center justify-start">
            {reply[0].isBotResponse && (
              <div className="ml-2 mr-6 py-2 px-3 text-black bg-gray-200 rounded-xl whitespace-pre-wrap">
                {reply[0].content}
              </div>
            )}
          </div>
        </div>
      ))}

      <form
        onSubmit={handleSendMessage}
        className="flex flex-col w-full absolute bottom-0 p-4">
        <div>
          <input
            type="text"
            ref={textInputRef}
            placeholder="Your Prompt"
            className="flex items-center p-4 mx-2 rounded-md border border-gray-300 w-[90%]"
          />
        </div>

        <div className="flex justify-end mr-9 mt-2">
          {messages.length !== 0 && (
            <button
              onClick={handleInsertText}
              className="ml-2 py-2 px-4 bg-white rounded-md border-1 text-black hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 flex items-center">
              <TfiArrowDown className="mr-2" />
              Insert
            </button>
          )}
          <button
            type="submit"
            className={`ml-4 py-2 px-4 bg-blue-500 text-white rounded-md ${
              submitted
                ? "disabled"
                : "hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            } flex items-center`}>
            {submitted ? (
              <>
                <TfiReload className="mr-2" />
                Regenerate
              </>
            ) : (
              <>
                <CiPaperplane className="mr-2" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
