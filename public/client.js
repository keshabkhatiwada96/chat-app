const socket = io()

const msgInput = document.getElementById('msg-input')
const sendBtn = document.getElementById('send-btn')
const messages = document.getElementById('messages')
const usernameInput = document.getElementById('username')

function getTime() {
  const d = new Date()
  let h = d.getHours()
  let m = d.getMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  m = m.toString().padStart(2, '0')
  return `${h}:${m} ${ampm}`
}

function sendMessage() {
  const text = msgInput.value.trim()
  const name = usernameInput.value.trim() || 'Anonymous'

  if (!text) return

  socket.emit('chat message', { name, text })
  msgInput.value = ''
}

socket.on('chat message', (data) => {
  const name = usernameInput.value.trim() || 'Anonymous'
  const isMe = data.name === name

  const msg = document.createElement('div')
  msg.className = `msg ${isMe ? 'me' : 'other'}`
  msg.innerHTML = `
    <div class="bubble">${data.text}</div>
    <div class="meta">${data.name} · ${getTime()}</div>
  `

  messages.appendChild(msg)
  messages.scrollTop = messages.scrollHeight
})

sendBtn.addEventListener('click', sendMessage)

msgInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage()
})``