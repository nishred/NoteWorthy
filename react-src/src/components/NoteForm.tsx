import { useState, useEffect } from "react";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteFormProps {
  onSubmit: (note: Note | Omit<Note, "id">) => void;
  initialNote?: Note | null;
}

export function NoteForm({ onSubmit, initialNote }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [initialNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    if (title.trim() && content.trim()) {
      onSubmit(
        initialNote ? { ...initialNote, title, content } : { title, content }
      );
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="h-32"
      />
      <Button type="submit">{initialNote ? "Update Note" : "Add Note"}</Button>
    </form>
  );
}
