import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";
import { NoteList } from "./components/NoteList";
import { NoteForm } from "./components/NoteForm";
import { Input } from "./components/ui/Input";

import { os, filesystem } from "@neutralinojs/lib";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    console.log("App component mounted");

    async function readFiles() {
      let entries = await filesystem.readDirectory("./notes");

      entries.forEach(async (entry) => {
        if (entry.type === "FILE" && entry.entry.endsWith(".txt")) {
          let fileContent = await filesystem.readFile(`./notes/${entry.entry}`);

          let [title, content] = fileContent.split(",");

          setNotes((prevNotes) => [
            ...prevNotes,
            { id: entry.entry.split(".")[0], title, content },
          ]);
        }
      });
    }

    readFiles();
  }, []);

  const addNote = async (note: Note | Omit<Note, "id">) => {
    const newNote = { ...note, id: Date.now().toString() };
    setNotes([newNote, ...notes]);

    await filesystem.writeFile(
      `./notes/${newNote.id}.txt`,
      `${newNote.title},${newNote.content}`
    );

    os.showNotification(
      "Note added",
      `Note ${note.title} has been added successfully.`
    );
  };

  const updateNote = async (note: Note | Omit<Note, "id">) => {
    const updatedNote = note as Note;

    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setEditingNote(null);

    let entries = await Neutralino.filesystem.readDirectory("./notes");

    for (let entry of entries) {
      if (entry.type === "FILE" && entry.entry.endsWith(".txt")) {
        let id = entry.entry.split(",")[0];

        if (id !== updatedNote.id) continue;

        await filesystem.writeFile(
          `./notes/${updatedNote.id}.txt`,
          `${updatedNote.title},${updatedNote.content}`
        );

        break;
      }
    }

    os.showNotification(
      "Note updated",
      `Note ${note.title} has been updated successfully.`
    );
  };

  const deleteNote = async (id: string) => {
    await filesystem.remove(`./notes/${id}.txt`);

    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">NoteWorthy</h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <NoteForm
          onSubmit={editingNote ? updateNote : addNote}
          initialNote={editingNote}
        />
      </div>
      <NoteList
        notes={filteredNotes}
        onEdit={setEditingNote}
        onDelete={deleteNote}
      />
    </div>
  );
}
