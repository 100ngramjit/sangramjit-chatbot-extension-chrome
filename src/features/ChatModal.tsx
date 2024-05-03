import React, { useRef, useState } from "react"

export const ChatSection = () => {
  const [messages, setMessages] = useState([])
  const [reply, setReply] = useState([
    {
      content: "This is a dummy response",
      isBotResponse: true
    }
  ])
  const textInputRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSendMessage = (event) => {
    event.preventDefault()
    const text = textInputRef.current.value.trim()

    if (text) {
      // Add user message
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
      contentEditableDiv.textContent = textToInsert
    }

    if (placeholder) {
      placeholder.innerHTML = ""
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {messages.map((message, index) => (
        <div key={index}>
          <div>{!message.isBotResponse && <div>{message.content}</div>}</div>

          <div>{reply[0].isBotResponse && <div>{reply[0].content}</div>}</div>
        </div>
      ))}

      <form onSubmit={handleSendMessage}>
        <div>
          <input type="text" ref={textInputRef} placeholder="Your Prompt" />
        </div>

        <div>
          <div>
            <button type="submit">
              {submitted ? "Regenerate" : "Generate"}
            </button>
            {messages.length !== 0 && (
              <button onClick={handleInsertText}>Insert Text</button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
