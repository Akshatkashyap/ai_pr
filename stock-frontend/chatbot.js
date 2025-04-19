<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gemini Chatbot</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      padding: 20px;
    }
    .chat-box {
      height: 400px;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 10px;
      background: #fff;
      margin-bottom: 10px;
    }
    .chat-message {
      margin: 10px 0;
    }
    .user-message {
      color: blue;
    }
    .bot-message {
      color: green;
    }
    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>

  <div id="chat-box" class="chat-box"></div>
  <input type="text" id="user-input" placeholder="Ask me anything..." />

  <script>
    const apiKey = 'YOUR_GEMINI_API_KEY'; // 🔥 Replace with your Gemini API key

    document.getElementById('user-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    async function sendMessage() {
      const input = document.getElementById('user-input');
      const userMessage = input.value.trim();
      if (!userMessage) return;

      appendMessage('You', userMessage);
      input.value = '';

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userMessage }]
          }]
        })
      });

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      appendMessage('Bot', botReply);
    }

    function appendMessage(sender, message) {
      const chatBox = document.getElementById('chat-box');
      const div = document.createElement('div');
      div.classList.add('chat-message');
      div.classList.add(sender === 'You' ? 'user-message' : 'bot-message');
      div.textContent = `${sender}: ${message}`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  </script>

</body>
</html>
