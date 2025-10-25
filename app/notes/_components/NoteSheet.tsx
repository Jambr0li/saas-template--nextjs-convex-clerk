"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface NoteSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  note?: any;
  onClose: () => void;
}

export default function NoteSheet({ isOpen, onOpenChange, note, onClose }: NoteSheetProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const createNote = useMutation(api.notes.createNote);
  const updateNote = useMutation(api.notes.updateNote);
  const deleteNote = useMutation(api.notes.deleteNote);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note, isOpen]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setIsSaving(true);
    try {
      if (note) {
        await updateNote({
          id: note._id,
          title: title.trim(),
          content: content.trim(),
        });
        toast.success("Note updated successfully");
      } else {
        await createNote({
          title: title.trim(),
          content: content.trim(),
        });
        toast.success("Note created successfully");
      }
      onClose();
    } catch (error) {
      toast.error(
        note ? "Failed to update note" : "Failed to create note"
      );
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!note) return;

    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteNote({ id: note._id });
      toast.success("Note deleted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to delete note");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{note ? "Edit Note" : "Create New Note"}</SheetTitle>
          <SheetDescription>
            {note ? "Update your note details" : "Add a new note to your collection"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 flex flex-col gap-4 py-4 overflow-hidden px-2">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              disabled={isSaving}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label htmlFor="content" className="text-sm font-medium text-gray-700">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Enter note content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 flex-1 resize-none"
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-between pt-4 border-t px-2">
          {note && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSaving}
            >
              Delete
            </Button>
          )}
          <div className="flex gap-2 ml-auto mb-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
