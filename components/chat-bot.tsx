"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getJobSuggestions, getCertificationSuggestions, type Student } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ChatBotProps {
  student: Student
}

type MessageType = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot({ student }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: `Hi ${student.firstName}! I'm your Career Assistant. Ask me about job or certification suggestions based on your skills!`,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Suggested questions
  const suggestedQuestions = [
    "What jobs match my skills?",
    "What certifications should I get?",
    "Which skills should I improve?",
    "Top 3 job matches?",
  ]

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = async () => {
    if (inputValue.trim() === "") return

    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(inputValue.trim().toLowerCase(), student)
      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (isMinimized) setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card
          className={cn(
            "w-80 md:w-96 shadow-lg transition-all duration-300 ease-in-out",
            isMinimized ? "h-16" : "h-[500px]",
          )}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-sm">Career Assistant</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-7 w-7">
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4 h-[360px]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col max-w-[80%] rounded-lg p-3",
                        message.sender === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1 self-end">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="text-sm flex space-x-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {messages.length === 1 && (
                <div className="px-4 py-2">
                  <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question) => (
                      <Badge
                        key={question}
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => {
                          setInputValue(question)
                        }}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend} disabled={inputValue.trim() === "" || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      ) : (
        <Button onClick={toggleChat} className="h-12 w-12 rounded-full shadow-lg" size="icon">
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

// Function to generate responses based on user input
function generateResponse(input: string, student: Student): string {
  // Get job and certification suggestions
  const jobSuggestions = getJobSuggestions(student)
  const certSuggestions = getCertificationSuggestions(student)

  // Count the skills the student has
  const skillCount = Object.values(student.skillsMap).filter(Boolean).length
  const totalSkills = Object.keys(student.skillsMap).length

  // Get missing skills (skills that are false in the skillsMap)
  const missingSkills = Object.entries(student.skillsMap)
    .filter(([_, hasSkill]) => !hasSkill)
    .map(([skill]) => skill.replace(/_/g, " "))

  // Check for job-related queries
  if (input.includes("job") || input.includes("career") || input.includes("work")) {
    if (input.includes("top") || input.includes("best") || input.includes("match")) {
      const topJobs = jobSuggestions.slice(0, 3)
      return `Based on your skills, here are your top 3 job matches:
1. ${topJobs[0].title} (${Math.round(topJobs[0].matchScore * 100)}% match) - ${topJobs[0].laborCode}
2. ${topJobs[1].title} (${Math.round(topJobs[1].matchScore * 100)}% match) - ${topJobs[1].laborCode}
3. ${topJobs[2].title} (${Math.round(topJobs[2].matchScore * 100)}% match) - ${topJobs[2].laborCode}

Would you like more details about any of these positions?`
    }

    return `Based on your skills profile, I recommend exploring these job roles:
1. ${jobSuggestions[0].title} (${Math.round(jobSuggestions[0].matchScore * 100)}% match)
2. ${jobSuggestions[1].title} (${Math.round(jobSuggestions[1].matchScore * 100)}% match)

These align well with your current skills in ${Object.entries(student.skillsMap)
      .filter(([_, hasSkill]) => hasSkill)
      .slice(0, 3)
      .map(([skill]) => skill.replace(/_/g, " "))
      .join(", ")}.`
  }

  // Check for certification-related queries
  if (input.includes("cert") || input.includes("qualification") || input.includes("credential")) {
    return `Based on your skills profile, these certifications would be valuable:
1. ${certSuggestions[0].name} (${Math.round(certSuggestions[0].matchScore * 100)}% match)
2. ${certSuggestions[1].name} (${Math.round(certSuggestions[1].matchScore * 100)}% match)

These certifications would help strengthen your expertise and make you more competitive in the job market.`
  }

  // Check for skills-related queries
  if (input.includes("skill") || input.includes("improve") || input.includes("learn")) {
    return `You currently have ${skillCount} out of ${totalSkills} skills in your profile (${Math.round((skillCount / totalSkills) * 100)}%).

To improve your job prospects, consider developing these skills:
1. ${missingSkills[0]}
2. ${missingSkills[1]}
3. ${missingSkills[2]}

These skills are in high demand and would complement your existing expertise.`
  }

  // Default response for other queries
  return `I can help you with job suggestions, certification recommendations, and skills analysis based on your profile. Try asking me about:
- Job matches for your skills
- Recommended certifications
- Skills you should improve
- Details about specific job roles`
}
