// Chatbot Module for FRCRCE Campus Connect
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Context prompt
const CAMPUS_CONNECT_CONTEXT = `You are FRCRCE Campus Connect AI, an assistant designed to help students of Fr. Conceicao Rodrigues College of Engineering with information about college events, councils, registration processes, and other campus activities.

Follow these guidelines:
- Provide helpful, accurate information about FRCRCE college events, councils, registration processes, and campus activities
- Help students navigate the Campus Connect platform to register for events, view galleries, form teams, and access other features
- Answer questions about upcoming events, event schedules, council activities, and registration deadlines
- Assist with basic troubleshooting for website features
- When uncertain, acknowledge limitations and suggest contacting the relevant council or checking the official college website`;

// Type definitions
interface Message {
  role: string;
  parts: { text: string }[];
}

let activeLanguage = "en";
let conversationHistory: Message[] = [];

// DOM Elements (will be initialized after DOM loads)
let chatToggleBtn: HTMLElement | null;
let chatWindow: HTMLElement | null;
let chatInput: HTMLInputElement | null;
let sendButton: HTMLElement | null;
let messagesContainer: HTMLElement | null;
let languageSelect: HTMLSelectElement | null;

// Initialize chat
function initChat() {
  // Get DOM elements
  chatToggleBtn = document.getElementById("chat-toggle-btn");
  chatWindow = document.getElementById("chat-window");
  chatInput = document.getElementById("chat-input") as HTMLInputElement;
  sendButton = document.getElementById("send-button");
  messagesContainer = document.getElementById("chat-messages");
  languageSelect = document.getElementById("language-selector") as HTMLSelectElement;

  if (!chatToggleBtn || !chatWindow || !chatInput || !sendButton || !messagesContainer || !languageSelect) {
    console.error("Chatbot: Required elements not found");
    return;
  }

  // Toggle chat window
  chatToggleBtn.addEventListener("click", () => {
    chatWindow!.classList.toggle("active");
    if (chatWindow!.classList.contains("active")) {
      chatInput!.focus();
      if (messagesContainer!.childElementCount === 0) {
        const welcomeMsg = getWelcomeMessage(activeLanguage);
        addBotMessage(welcomeMsg);
        conversationHistory.push({ role: "model", parts: [{ text: welcomeMsg }] });
      }
    }
  });

  // Language change
  languageSelect.addEventListener("change", (e) => {
    activeLanguage = (e.target as HTMLSelectElement).value;
    conversationHistory = [];
    const changeMsg = getLanguageChangeMessage(activeLanguage);
    addBotMessage(changeMsg);
    conversationHistory.push({ role: "model", parts: [{ text: changeMsg }] });
  });

  sendButton.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
  });
}

// Messages + AI
function getWelcomeMessage(lang: string): string {
  const msgs: Record<string, string> = {
    en: "Welcome to FRCRCE Campus Connect AI assistant...",
    hi: "FRCRCE Campus Connect AI सहायक में आपका स्वागत है...",
    mr: "FRCRCE Campus Connect AI सहाय्यकात आपले स्वागत आहे...",
    gu: "FRCRCE Campus Connect AI સહાયકમાં આપનું સ્વાગત છે...",
    ta: "FRCRCE Campus Connect AI உதவியாளருக்கு வரவேற்கிறோம்...",
    te: "FRCRCE Campus Connect AI సహాయకుడికి స్వాగతం...",
    kn: "FRCRCE Campus Connect AI ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ...",
    ml: "FRCRCE Campus Connect AI സഹായിയിലേക്ക് സ്വാഗതം..."
  };
  return msgs[lang] || msgs.en;
}

function getLanguageChangeMessage(lang: string): string {
  const msgs: Record<string, string> = {
    en: "I've switched to English...",
    hi: "मैंने हिंदी में बदल दिया है...",
    mr: "मी मराठीत बदललो आहे...",
    gu: "હું હવે ગુજરાતી માં છું...",
    ta: "நான் இப்போது தமிழில் இருக்கிறேன்...",
    te: "నేను ఇప్పుడు తెలుగులో ఉన్నాను...",
    kn: "ನಾನು ಈಗ ಕನ್ನಡದಲ್ಲಿ ಇದ್ದೇನೆ...",
    ml: "ഞാൻ ഇപ്പോൾ മലയാളത്തിലാണ്..."
  };
  return msgs[lang] || msgs.en;
}

function getLanguageInstruction(lang: string): string {
  const instr: Record<string, string> = {
    en: "Please respond only in English.",
    hi: "कृपया केवल हिंदी में उत्तर दें।",
    mr: "कृपया फक्त मराठी भाषेत उत्तर द्या।",
    gu: "કૃપા કરીને ફક્ત ગુજરાતી ભાષામાં જવાબ આપો।",
    ta: "தயவுசெய்து தமிழில் மட்டுமே பதிலளிக்கவும்.",
    te: "దయచేసి తెలుగులో మాత్రమే సమాధానం ఇవ్వండి.",
    kn: "ದಯವಿಟ್ಟು ಕನ್ನಡದಲ್ಲಿ ಮಾತ್ರ ಉತ್ತರಿಸಿ.",
    ml: "ദയവായി മലയാളത്തിൽ മാത്രം ഉത്തരം നൽകുക."
  };
  return instr[lang] || instr.en;
}

function handleSendMessage() {
  const msg = chatInput!.value.trim();
  if (!msg) return;
  addUserMessage(msg);
  conversationHistory.push({ role: "user", parts: [{ text: msg }] });
  chatInput!.value = "";
  showTypingIndicator();
  getAIResponse(msg);
}

function addUserMessage(msg: string) {
  const el = document.createElement("div");
  el.classList.add("navapur-message", "navapur-user-message");
  el.textContent = msg;
  messagesContainer!.appendChild(el);
  scrollToBottom();
}

function addBotMessage(msg: string) {
  const el = document.createElement("div");
  el.classList.add("navapur-message", "navapur-bot-message");
  // @ts-ignore - marked is loaded via CDN in index.html
  el.innerHTML = marked.parse(msg);
  messagesContainer!.appendChild(el);
  scrollToBottom();
}

function showTypingIndicator() {
  const el = document.createElement("div");
  el.classList.add("navapur-message", "navapur-bot-message", "navapur-typing-indicator");
  el.innerHTML = "<span></span><span></span><span></span>";
  el.id = "typing-indicator";
  messagesContainer!.appendChild(el);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

function scrollToBottom() {
  messagesContainer!.scrollTop = messagesContainer!.scrollHeight;
}

// AI API call
async function getAIResponse(userMessage: string) {
  try {
    const systemMsg = `${CAMPUS_CONNECT_CONTEXT}\n\n${getLanguageInstruction(activeLanguage)}`;
    const contents = [{ role: "user", parts: [{ text: systemMsg }] }, ...conversationHistory];
    const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 1024 } })
    });
    const data = await res.json();
    removeTypingIndicator();
    if (data.candidates?.[0]?.content) {
      const reply = data.candidates[0].content.parts[0].text;
      addBotMessage(reply);
      conversationHistory.push({ role: "model", parts: [{ text: reply }] });
      if (conversationHistory.length > 20) conversationHistory = conversationHistory.slice(-20);
    } else {
      addBotMessage("⚠️ Sorry, I couldn't get a response. Try again later.");
    }
  } catch (err) {
    removeTypingIndicator();
    addBotMessage("⚠️ Error connecting to AI service.");
    console.error(err);
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initChat);

export { initChat };
