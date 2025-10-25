import { auth } from "@clerk/nextjs/server";
import NotesList from "./_components/NotesList";

export default async function NotesPage() {
  await auth.protect();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Notes</h1>
          <p className="text-gray-600 mt-2">Create and manage your personal notes</p>
        </div>
        <NotesList />
      </div>
    </div>
  );
}
