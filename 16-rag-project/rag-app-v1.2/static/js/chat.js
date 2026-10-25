(function () {
  const log = document.getElementById('chatLog');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  function scrollToBottom() {
    log.scrollTop = log.scrollHeight;
  }

  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'msg user';
    el.textContent = text;
    log.appendChild(el);
    scrollToBottom();
  }

  // Renders the plain-text answer from ask() as simple paragraphs / bullet
  // lists. No content is added beyond what the backend returned.
  function renderAnswerText(container, text) {
    const lines = text.split('\n');
    let listEl = null;

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (!line) {
        listEl = null;
        return;
      }

      const isBullet = /^[-*•]\s+/.test(line);

      if (isBullet) {
        if (!listEl) {
          listEl = document.createElement('ul');
          container.appendChild(listEl);
        }
        const li = document.createElement('li');
        li.textContent = line.replace(/^[-*•]\s+/, '');
        listEl.appendChild(li);
      } else {
        listEl = null;
        const p = document.createElement('p');
        p.textContent = line;
        container.appendChild(p);
      }
    });
  }

  function addBotMessage(text) {
    const el = document.createElement('div');
    el.className = 'msg bot';
    renderAnswerText(el, text);
    log.appendChild(el);
    scrollToBottom();
  }

  function addErrorMessage(text) {
    const el = document.createElement('div');
    el.className = 'msg error';
    el.textContent = text;
    log.appendChild(el);
    scrollToBottom();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'typing';
    el.id = 'typingIndicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    log.appendChild(el);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  async function sendQuestion() {
    const question = input.value.trim();
    if (!question) return;

    addUserMessage(question);
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      hideTyping();

      if (!res.ok || data.error) {
        addErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      // Only ever render the answer text returned by ask().
      addBotMessage(data.answer);
    } catch (err) {
      hideTyping();
      addErrorMessage('Could not reach the chatbot service. Please try again.');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener('click', sendQuestion);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

  input.focus();
})();
