"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hey there! I am SSK's Digital Co-Pilot. ⚡\n\nNeed an audit of your current website, want to build a highly optimized 3D platform like this one, or looking to connect with SSK directly? Ask me anything!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Mark as read when opened
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setUnread(false);
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate Bot Response with typing delay
    setTimeout(() => {
      const responseText = getBotResponse(text);
      const botMsg = {
        id: messages.length + 2,
        sender: "bot",
        text: responseText.text,
        isWhatsApp: responseText.isWhatsApp,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase();

    // Connection or WhatsApp Queries
    if (
      text.includes("connect") || 
      text.includes("talk") || 
      text.includes("meet") || 
      text.includes("whatsapp") || 
      text.includes("call") || 
      text.includes("hire") || 
      text.includes("contact") || 
      text.includes("number") ||
      text.includes("chat") ||
      text.includes("milna") ||
      text.includes("baat")
    ) {
      return {
        text: "Awesome! Let's connect directly on WhatsApp. Click the button below to start chat with SSK instantly! 📲✨",
        isWhatsApp: true
      };
    }

    // Domain, cool website, thessk.in, web.thessk.in, or building this website
    if (
      text.includes("thessk.in") || 
      text.includes("web.thessk.in") || 
      text.includes("cool website") || 
      text.includes("cool design") || 
      text.includes("this website") || 
      text.includes("this design") || 
      text.includes("design like this") ||
      text.includes("such a website") ||
      text.includes("aisi website") ||
      text.includes("domain")
    ) {
      return {
        text: "This flagship platform (thessk.in / web.thessk.in) is engineered with next-gen React 19, Turbopack, and Three.js 3D WebGL for a high-end cinematic experience. 🌌🎨\n\nTo build a highly customized digital solution of this premium caliber for your business, let's connect directly! I am redirecting you to WhatsApp for direct consultation.",
        isWhatsApp: true
      };
    }

    // Audit and issues queries
    if (
      text.includes("audit") || 
      text.includes("issue") || 
      text.includes("fix") || 
      text.includes("error") || 
      text.includes("bug") || 
      text.includes("seo") || 
      text.includes("speed") || 
      text.includes("slow") || 
      text.includes("loading") || 
      text.includes("broken") ||
      text.includes("kami") ||
      text.includes("galti") ||
      text.includes("kya problem")
    ) {
      return {
        text: "Most common website issues include:\n\n💻 1. Blazing hydration mismatches\n⚡ 2. Sub-optimal loading speeds (uncompressed media)\n🔍 3. Weak SEO structures & missing metadata\n📱 4. Inconsistent responsive layouts on custom screens\n\nWe can run a comprehensive, deep-level diagnostic check on your domain. Let's chat on WhatsApp so SSK can audit it manually for you! 🛠️",
        isWhatsApp: true
      };
    }

    // Fallback response
    return {
      text: "I'm SSK's Digital Co-Pilot! 🤖\n\n- Type 'Audit' to check your website's performance.\n- Type 'Design' or ask about our domain to build custom sites like this.\n- Or ask to 'Connect' to chat directly with SSK on WhatsApp!",
      isWhatsApp: false
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* ── FLOATING CHAT BUTTON ── */}
      <div className="fixed bottom-8 right-8 z-[200]">
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.1, rotate: isOpen ? 90 : 0 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 rounded-full bg-[#ff4d4d] text-white flex items-center justify-center shadow-[0_8px_32px_rgba(255,77,77,0.4)] cursor-pointer focus:outline-none border-2 border-white/20"
          aria-label="Open Chatbot"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}

          {/* Unread pulsing badge */}
          <AnimatePresence>
            {unread && !isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-0 w-5 h-5 bg-black border border-white text-white font-mono text-[9px] font-black rounded-full flex items-center justify-center shadow-lg"
              >
                1
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── CHATBOX MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed bottom-28 right-4 sm:right-8 z-[200] w-[92vw] sm:w-[400px] h-[550px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-3xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#ff4d4d]/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#ff4d4d]/20 border border-[#ff4d4d]/40 flex items-center justify-center text-[#ff4d4d] font-mono font-black text-xs">
                    SSK
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-black rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-black tracking-widest text-white uppercase leading-none">DIGITAL CO-PILOT</h4>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] mt-1 block">AI Assistant v1.2</span>
                </div>
              </div>

              <button 
                onClick={toggleChat}
                className="text-white/40 hover:text-white transition-colors focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Chat Body & Message List */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin select-none">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`p-4 rounded-xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line font-medium ${
                    msg.sender === "user" 
                      ? "bg-white/10 text-white border border-white/5" 
                      : "bg-[#ff4d4d]/10 text-white border-l-2 border-[#ff4d4d] border-t border-r border-b border-white/5"
                  }`}>
                    {msg.text}

                    {/* Conditional WhatsApp CTA Button */}
                    {msg.isWhatsApp && (
                      <a 
                        href="https://wa.me/918302648076"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-mono font-black text-[9px] uppercase tracking-widest rounded-sm hover:brightness-110 transition-all shadow-md cursor-pointer border border-[#25D366]"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>Chat on WhatsApp</span>
                      </a>
                    )}
                  </div>
                  <span className="text-[8px] font-mono text-white/30 mt-1 block px-1">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions / Custom Choice Chips */}
            <div className="px-5 pb-3 pt-2 flex flex-wrap gap-2 border-t border-white/5 bg-white/[0.01]">
              {[
                { label: "💻 Audit Website", action: "Audit My Website" },
                { label: "🚀 Build Like This", action: "Build website like this" },
                { label: "📞 Connect WhatsApp", action: "Connect on WhatsApp" }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.action)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-[#ff4d4d]/10 hover:text-[#ff4d4d] border border-white/10 hover:border-[#ff4d4d]/30 text-[9px] font-mono font-black uppercase tracking-wider rounded-sm transition-all focus:outline-none cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-black">
              <input
                type="text"
                placeholder="Type 'Audit', 'Domain' or ask to connect..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#ff4d4d] text-white rounded-lg px-4 py-3 text-xs placeholder-white/30 focus:outline-none transition-colors"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="w-10 h-10 rounded-lg bg-[#ff4d4d] text-white flex items-center justify-center shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
