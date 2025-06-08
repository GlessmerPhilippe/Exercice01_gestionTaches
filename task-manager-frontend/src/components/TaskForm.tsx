import { useState, useEffect } from "react";
import { toast } from "react-toastify";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  reminder?: string;
};

type TaskFormProps = {
  onAdd: (task: any) => void;
  taskToEdit: Task | null;
};

export default function TaskForm({ onAdd, taskToEdit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setPriority(taskToEdit.priority);
      setId(taskToEdit.id);
    } else {
      setTitle("");
      setPriority("medium");
      setId(null);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const url = id
      ? `http://localhost:3000/tasks/${id}`
      : "http://localhost:3000/tasks";
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority }),
    })
      .then((res) => res.json())
      .then((data) => {
        onAdd(data);
        toast.success(id ? "Tâche modifiée !" : "Tâche ajoutée !");
        setTitle("");
        setPriority("medium");
        setId(null);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 items-end flex-wrap">
      <input
        className="border border-gray-300 bg-gray-50 p-3 rounded w-full sm:w-auto flex-1 focus:ring focus:border-indigo-400 transition text-lg"
        placeholder="Titre de la tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select
        className="border border-gray-300 bg-gray-50 p-3 rounded focus:ring focus:border-indigo-400 transition text-lg"
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
      >
        <option value="low">Basse</option>
        <option value="medium">Moyenne</option>
        <option value="high">Haute</option>
      </select>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-5 py-3 font-semibold shadow transition" type="submit">
        {id ? "Modifier" : "Ajouter"}
      </button>
      {id && (
        <button
          type="button"
          onClick={() => {
            setTitle("");
            setPriority("medium");
            setId(null);
          }}
          className="ml-2 px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
        >
          Annuler
        </button>
      )}
    </form>
  );
}
