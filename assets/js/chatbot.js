const chatMessages = document.getElementById("chatMessages");

function addMessageToChat(message, sender, time = "Just now") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.innerHTML = `
            <div class="bubble">${message}</div>
            <span class="time">${time}</span>
        `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to latest message
}

const submit = document.getElementById("sendMessage");
submit.addEventListener("click", (e) => {
  const userInput = document.getElementById("userInput").value;
  if (!userInput) {
    alert("please enter a message");
    return;
  }
  submit.innerText = "Sending...";
  try {
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "user",
            content: "What is the meaning of life?",
          },
        ],
      }),
    });
  } catch (error) {}
});
