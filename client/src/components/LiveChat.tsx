import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  avatar?: string;
}

const QUICK_PROMPTS = [
  "How do I get started as a provider?",
  "What's the payment process?",
  "How does contract management work?",
  "What are the verification requirements?",
  "Can I hire a team on TheSmartPro?",
  "Is my data secure?",
];

const BOT_RESPONSES: Record<string, string> = {
  "How do I get started as a provider?":
    "Great question! To get started as a provider:\n\n1. Create your account\n2. Complete your profile with skills and experience\n3. Pass our verification process\n4. Set your rates and availability\n5. Start receiving bookings!\n\nCheck out our Provider Onboarding guide for detailed steps.",
  
  "What's the payment process?":
    "Our payment process is simple and secure:\n\n1. Client books your service\n2. Payment is held in escrow\n3. You deliver the work\n4. Client approves completion\n5. Funds are released to your account\n\nWe use Stripe for secure payments and you keep 80% of earnings!",
  
  "How does contract management work?":
    "TheSmartPro provides professional booking agreements:\n\n• Automated contract generation\n• Milestone-based tracking\n• Revision management\n• Approval workflows\n• Complete audit logging\n\nThis ensures both parties are protected and everything is documented.",
  
  "What are the verification requirements?":
    "Our verification process ensures quality:\n\n• Government-issued ID verification\n• Background check (varies by service type)\n• Portfolio/experience review\n• Skills assessment\n• Reference checks\n\nTypically takes 2-3 business days.",
  
  "Can I hire a team on TheSmartPro?":
    "Absolutely! Organizations can:\n\n• Hire multiple professionals\n• Manage team projects\n• Set custom permissions\n• Track budgets and timelines\n• Collaborate with team members\n\nPerfect for scaling your workforce flexibly.",
  
  "Is my data secure?":
    "Security is our top priority:\n\n✓ Enterprise-grade encryption\n✓ SOC 2 Type II certified\n✓ GDPR compliant\n✓ Complete audit logging\n✓ Role-based access control\n✓ Regular security audits\n\nYour data is protected with industry-leading security standards.",
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi! 👋 Welcome to TheSmartPro.io. How can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
      avatar: '👨‍💼'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [showForm, setShowForm] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate agent response after a short delay
    setTimeout(() => {
      const botResponse =
        BOT_RESPONSES[messageText.trim()] ||
        "Thanks for your question! For more specific help, please contact our support team at support@thesmartpro.io or schedule a demo with our team.";

      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'agent',
        timestamp: new Date(),
        avatar: '🤖'
      };

      setMessages(prev => [...prev, agentMessage]);
    }, 800);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitorName.trim() && visitorEmail.trim()) {
      setShowForm(false);
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Great! Thanks for providing your details, ${visitorName}. How can I assist you with TheSmartPro.io today?`,
        sender: 'agent',
        timestamp: new Date(),
        avatar: '👨‍💼'
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'w-96' : 'w-auto'
        }`}
      >
        {isOpen && !isMinimized && (
          <div className="bg-white border border-border rounded-xl shadow-2xl flex flex-col h-96 overflow-hidden animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">TheSmartPro Support</h3>
                  <p className="text-xs text-white/80">We're online!</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && showForm === false && (
              <div className="px-4 py-3 border-b border-border bg-muted/20">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  Common Questions:
                </p>
                <div className="space-y-2">
                  {QUICK_PROMPTS.slice(0, 3).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="w-full text-left text-xs p-2 rounded bg-white hover:bg-primary/10 text-foreground hover:text-primary transition-colors border border-border hover:border-primary"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-lg">
                      {message.avatar}
                    </div>
                  )}
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white border border-border text-foreground rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-white/70'
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Form or Input Area */}
            {showForm ? (
              <div className="p-4 border-t border-border bg-white">
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={visitorName}
                      onChange={e => setVisitorName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={visitorEmail}
                      onChange={e => setVisitorEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Start Chat
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-4 border-t border-border bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={!showForm}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {isMinimized && (
          <div className="bg-white border border-border rounded-xl shadow-2xl p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setIsMinimized(false)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Support Chat</p>
                <p className="text-xs text-muted-foreground">Click to open</p>
              </div>
            </div>
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          </div>
        )}

        {/* Floating Button */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Notification Badge */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-bounce">
          <div className="bg-secondary text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap">
            💬 Need help? Chat with us!
          </div>
        </div>
      )}
    </>
  );
}
