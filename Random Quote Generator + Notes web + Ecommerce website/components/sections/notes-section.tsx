"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Mic, MicOff } from "lucide-react"

interface Note {
  id: string
  text: string
  createdAt: string
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (err) {
        console.error("Failed to load notes:", err)
      }
    }
    setMounted(true)

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setNewNote((prev) => prev + transcript + " ")
          } else {
            interimTranscript += transcript
          }
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes, mounted])

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        text: newNote,
        createdAt: new Date().toLocaleDateString(),
      }
      setNotes([note, ...notes])
      setNewNote("")
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      addNote()
    }
  }

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  if (!mounted) {
    return <div className="text-center py-12 text-muted-foreground">Loading notes...</div>
  }

  return (
    <div className="space-y-6">
      {/* Add Note */}
      <Card className="p-6 bg-card">
        <div className="space-y-4">
          <Textarea
            placeholder="Write a new note... (Ctrl+Enter to add)"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-24 resize-none"
          />
          <div className="flex gap-2">
            <Button onClick={addNote} className="flex-1 gap-2" disabled={!newNote.trim()}>
              <Plus className="h-4 w-4" />
              Add Note
            </Button>
            <Button onClick={toggleVoiceRecording} variant={isListening ? "destructive" : "outline"} className="gap-2">
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Voice
                </>
              )}
            </Button>
          </div>
          {isListening && <p className="text-sm text-primary animate-pulse">Listening... Click Stop to finish</p>}
        </div>
      </Card>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No notes yet. Start by adding one!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note.id} className="p-4 bg-secondary/50 hover:bg-secondary/80 transition-colors flex flex-col">
              <p className="text-xs text-muted-foreground mb-3">{note.createdAt}</p>
              <p className="text-foreground flex-1 mb-4 whitespace-pre-wrap break-words text-sm">{note.text}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteNote(note.id)}
                className="self-end text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
