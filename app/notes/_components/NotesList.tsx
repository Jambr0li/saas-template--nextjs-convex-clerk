"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Edit2 } from "lucide-react";
import NoteSheet from "./NoteSheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NotesList() {
  const notes = useQuery(api.notes.listNotesByUser);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);

  const handleCreateNew = () => {
    setSelectedNote(null);
    setIsOpen(true);
  };

  const handleEditNote = (note: any) => {
    setSelectedNote(note);
    setIsOpen(true);
  };

  const handleCloseSheet = () => {
    setIsOpen(false);
    setSelectedNote(null);
  };

  if (notes === undefined) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500 text-lg">No notes yet. Create your first note to get started!</p>
        </Card>
      ) : (
        <ScrollArea className="w-full rounded-lg border">
          <div className="p-4 space-y-3">
            {notes.map((note: any) => (
              <Card key={note._id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{note.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">{note.content}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditNote(note)} className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <div
                          onClick={() => handleEditNote(note)}
                          className="flex items-center gap-2 cursor-pointer text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      <NoteSheet
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        note={selectedNote}
        onClose={handleCloseSheet}
      />
    </>
  );
}
