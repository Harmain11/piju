(function () {
  const chatHistory = [];

  const styles = `
    #piju-chat-bubble {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      font-family: 'Orbitron', sans-serif;
    }

    #piju-chat-toggle {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      background: #000;
      border: 2px solid #EAB308;
      box-shadow: 0 0 18px rgba(234,179,8,0.6), 0 0 40px rgba(234,179,8,0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      overflow: hidden;
      padding: 0;
      flex-shrink: 0;
    }

    #piju-chat-toggle:hover {
      transform: scale(1.08);
      box-shadow: 0 0 28px rgba(234,179,8,0.85), 0 0 60px rgba(234,179,8,0.35);
    }

    #piju-chat-toggle img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    #piju-chat-window {
      display: none;
      flex-direction: column;
      width: 340px;
      height: 480px;
      background: #050B14;
      border: 1px solid rgba(234,179,8,0.4);
      box-shadow: 0 0 30px rgba(234,179,8,0.25), 0 0 80px rgba(0,0,0,0.8);
      border-radius: 4px;
      overflow: hidden;
    }

    #piju-chat-window.open {
      display: flex;
    }

    #piju-chat-header {
      background: linear-gradient(135deg, #000 0%, #0d0d0d 100%);
      border-bottom: 1px solid rgba(234,179,8,0.35);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    #piju-chat-header img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid rgba(234,179,8,0.5);
      object-fit: cover;
    }

    #piju-chat-header-info {
      flex: 1;
    }

    #piju-chat-header-name {
      color: #EAB308;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }

    #piju-chat-header-status {
      color: #6b7280;
      font-size: 9px;
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
    }

    #piju-chat-header-status span.dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      display: inline-block;
      box-shadow: 0 0 6px rgba(34,197,94,0.8);
    }

    #piju-chat-close {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
      transition: color 0.2s;
    }

    #piju-chat-close:hover {
      color: #EAB308;
    }

    #piju-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: rgba(234,179,8,0.3) transparent;
    }

    #piju-chat-messages::-webkit-scrollbar {
      width: 4px;
    }

    #piju-chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    #piju-chat-messages::-webkit-scrollbar-thumb {
      background: rgba(234,179,8,0.3);
      border-radius: 2px;
    }

    .piju-msg {
      display: flex;
      gap: 8px;
      animation: pijuFadeIn 0.25s ease;
    }

    @keyframes pijuFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .piju-msg.user {
      flex-direction: row-reverse;
    }

    .piju-msg-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      flex-shrink: 0;
      overflow: hidden;
      border: 1px solid rgba(234,179,8,0.4);
    }

    .piju-msg-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .piju-msg-bubble {
      max-width: 75%;
      padding: 9px 13px;
      font-size: 11px;
      line-height: 1.6;
      letter-spacing: 0.03em;
      border-radius: 2px;
    }

    .piju-msg.bot .piju-msg-bubble {
      background: rgba(234,179,8,0.07);
      border: 1px solid rgba(234,179,8,0.2);
      color: #d1d5db;
      border-radius: 0 4px 4px 4px;
    }

    .piju-msg.user .piju-msg-bubble {
      background: rgba(234,179,8,0.15);
      border: 1px solid rgba(234,179,8,0.35);
      color: #EAB308;
      border-radius: 4px 0 4px 4px;
      text-align: right;
    }

    .piju-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 9px 13px;
      background: rgba(234,179,8,0.07);
      border: 1px solid rgba(234,179,8,0.2);
      border-radius: 0 4px 4px 4px;
      width: fit-content;
    }

    .piju-typing span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #EAB308;
      animation: pijuDot 1.2s infinite;
    }

    .piju-typing span:nth-child(2) { animation-delay: 0.2s; }
    .piju-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pijuDot {
      0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }

    #piju-chat-input-area {
      border-top: 1px solid rgba(234,179,8,0.2);
      padding: 10px 12px;
      display: flex;
      gap: 8px;
      align-items: center;
      background: #000;
      flex-shrink: 0;
    }

    #piju-chat-input {
      flex: 1;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(234,179,8,0.25);
      color: #fff;
      padding: 8px 12px;
      font-family: 'Orbitron', sans-serif;
      font-size: 10px;
      letter-spacing: 0.05em;
      border-radius: 2px;
      outline: none;
      transition: border-color 0.2s;
    }

    #piju-chat-input::placeholder {
      color: #4b5563;
    }

    #piju-chat-input:focus {
      border-color: rgba(234,179,8,0.6);
      box-shadow: 0 0 8px rgba(234,179,8,0.15);
    }

    #piju-chat-send {
      background: #EAB308;
      border: none;
      color: #000;
      width: 34px;
      height: 34px;
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s, transform 0.15s;
    }

    #piju-chat-send:hover {
      background: #ca8a04;
      transform: scale(1.05);
    }

    #piju-chat-send:disabled {
      background: rgba(234,179,8,0.3);
      cursor: not-allowed;
      transform: none;
    }

    #piju-chat-send svg {
      width: 15px;
      height: 15px;
    }

    #piju-chat-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0 14px 10px;
    }

    .piju-suggestion {
      background: rgba(234,179,8,0.08);
      border: 1px solid rgba(234,179,8,0.25);
      color: #EAB308;
      font-family: 'Orbitron', sans-serif;
      font-size: 9px;
      letter-spacing: 0.06em;
      padding: 4px 8px;
      border-radius: 2px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }

    .piju-suggestion:hover {
      background: rgba(234,179,8,0.18);
      border-color: rgba(234,179,8,0.5);
    }

    @media (max-width: 480px) {
      #piju-chat-window {
        width: calc(100vw - 24px);
        right: 0;
      }
      #piju-chat-bubble {
        bottom: 16px;
        right: 12px;
      }
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);

  const html = `
    <div id="piju-chat-bubble">
      <div id="piju-chat-window">
        <div id="piju-chat-header">
          <img src="/assets/images/branding/piju-bot-avatar.png" alt="PIJU Bot" />
          <div id="piju-chat-header-info">
            <div id="piju-chat-header-name">PIJU BOT</div>
            <div id="piju-chat-header-status">
              <span class="dot"></span> ONLINE — ASK ME ANYTHING
            </div>
          </div>
          <button id="piju-chat-close" title="Close">✕</button>
        </div>

        <div id="piju-chat-messages"></div>

        <div id="piju-chat-suggestions">
          <button class="piju-suggestion" data-q="What is $PIJU?">What is $PIJU?</button>
          <button class="piju-suggestion" data-q="When does PIJU launch?">Launch date?</button>
          <button class="piju-suggestion" data-q="What is the PIJU roadmap?">Roadmap</button>
          <button class="piju-suggestion" data-q="How do I join the PIJU community?">Community</button>
        </div>

        <div id="piju-chat-input-area">
          <input id="piju-chat-input" type="text" placeholder="ASK ABOUT $PIJU..." maxlength="300" />
          <button id="piju-chat-send" title="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

      <button id="piju-chat-toggle" title="Chat with PIJU Bot">
        <img src="/assets/images/branding/piju-bot-avatar.png" alt="PIJU Bot" />
      </button>
    </div>
  `;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper.firstElementChild);

  const chatWindow = document.getElementById("piju-chat-window");
  const toggleBtn = document.getElementById("piju-chat-toggle");
  const closeBtn = document.getElementById("piju-chat-close");
  const messagesContainer = document.getElementById("piju-chat-messages");
  const inputEl = document.getElementById("piju-chat-input");
  const sendBtn = document.getElementById("piju-chat-send");
  const suggestions = document.querySelectorAll(".piju-suggestion");

  function toggleChat() {
    const isOpen = chatWindow.classList.contains("open");
    if (!isOpen) {
      chatWindow.classList.add("open");
      inputEl.focus();
      if (messagesContainer.children.length === 0) {
        addBotMessage("Yo! 🦆 I'm PIJU Bot — your guide to the $PIJU universe. Ask me anything about the token, roadmap, community, or when we're launching to the moon! 🚀");
      }
    } else {
      chatWindow.classList.remove("open");
    }
  }

  toggleBtn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  function addBotMessage(text) {
    const clean = stripMarkdown(text);
    const msg = document.createElement("div");
    msg.className = "piju-msg bot";
    msg.innerHTML = `
      <div class="piju-msg-avatar"><img src="/assets/images/branding/piju-bot-avatar.png" alt="PIJU" /></div>
      <div class="piju-msg-bubble">${escapeHtml(clean)}</div>
    `;
    messagesContainer.appendChild(msg);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "piju-msg user";
    msg.innerHTML = `<div class="piju-msg-bubble">${escapeHtml(text)}</div>`;
    messagesContainer.appendChild(msg);
    scrollToBottom();
  }

  function addTypingIndicator() {
    const row = document.createElement("div");
    row.className = "piju-msg bot";
    row.id = "piju-typing-row";
    row.innerHTML = `
      <div class="piju-msg-avatar"><img src="/assets/images/branding/piju-bot-avatar.png" alt="PIJU" /></div>
      <div class="piju-typing"><span></span><span></span><span></span></div>
    `;
    messagesContainer.appendChild(row);
    scrollToBottom();
    return row;
  }

  function removeTypingIndicator() {
    const el = document.getElementById("piju-typing-row");
    if (el) el.remove();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function stripMarkdown(text) {
    return text
      .replace(/#{1,6}\s+/g, "")
      .replace(/\*\*\*(.+?)\*\*\*/g, "$1")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/___(.+?)___/g, "$1")
      .replace(/__(.+?)__/g, "$1")
      .replace(/_(.+?)_/g, "$1")
      .replace(/~~(.+?)~~/g, "$1")
      .replace(/`{3}[\s\S]*?`{3}/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^>\s+/gm, "")
      .replace(/---+/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  async function sendMessage(text) {
    if (!text.trim()) return;

    document.getElementById("piju-chat-suggestions").style.display = "none";

    addUserMessage(text);
    chatHistory.push({ role: "user", content: text });

    inputEl.value = "";
    sendBtn.disabled = true;
    inputEl.disabled = true;

    const typingRow = addTypingIndicator();

    try {
      const res = await fetch("/api/chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: chatHistory.slice(0, -1) })
      });

      let data;
      try { data = await res.json(); } catch(e) {
        removeTypingIndicator();
        addBotMessage("Server error (invalid response). Make sure api/config.php has your API key and re-upload to Hostinger.");
        return;
      }
      removeTypingIndicator();

      if (data.reply) {
        addBotMessage(data.reply);
        chatHistory.push({ role: "assistant", content: data.reply });
      } else if (data.error) {
        addBotMessage("Error: " + data.error);
      } else {
        addBotMessage("Something went wrong on my end. Try again in a sec!");
      }
    } catch (err) {
      removeTypingIndicator();
      addBotMessage("Network error — couldn't reach the server. Check your Hostinger upload includes the api/ folder.");
    } finally {
      sendBtn.disabled = false;
      inputEl.disabled = false;
      inputEl.focus();
    }
  }

  sendBtn.addEventListener("click", () => sendMessage(inputEl.value));

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });

  suggestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = btn.getAttribute("data-q");
      sendMessage(q);
    });
  });
})();
