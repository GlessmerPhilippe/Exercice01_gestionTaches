import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  reminder?: string;
};

type TaskListProps = {
  setTaskToEdit: (task: Task) => void;
};

function priorityBadgeClass(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-400";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-400";
    case "low":
      return "bg-cyan-100 text-cyan-800 border-cyan-400";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

export default function TaskList({ setTaskToEdit }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  function fetchTasks() {
    setLoading(true);
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then(setTasks)
      .finally(() => setLoading(false));
  }

  function handleDelete(id: number) {
    fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" })
      .then(() => {
        fetchTasks();
        toast.info("Tâche supprimée !");
      });
  }

  function handleToggleComplete(task: Task) {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    }).then(() => {
      fetchTasks();
      toast.success(
        !task.completed ? "Tâche terminée !" : "Remise en 'à faire'."
      );
    });
  }

  return (
    <div className="space-y-4">
      {loading && <div className="text-center text-gray-400">Chargement…</div>}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-5 rounded-xl shadow flex flex-col gap-1 border-l-8 bg-white relative"
          style={{
            borderColor:
              task.priority === "high"
                ? "#ef4444"
                : task.priority === "medium"
                ? "#f59e42"
                : "#22d3ee",
          }}
        >
          <button
            className="absolute top-2 right-2 text-red-400 hover:text-red-700 transition text-lg"
            onClick={() => handleDelete(task.id)}
            title="Supprimer la tâche"
          >
            ×
          </button>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">{task.title}</span>
            <span className={`px-3 py-1 text-xs rounded-full border font-bold ${priorityBadgeClass(task.priority)}`}>
              {task.priority === "low"
                ? "Basse"
                : task.priority === "medium"
                ? "Moyenne"
                : "Haute"}
            </span>
          </div>
          {task.description && (
            <div className="text-gray-600">{task.description}</div>
          )}
          <div className="text-xs text-gray-400">
            Rappel : {task.reminder ? new Date(task.reminder).toLocaleString() : "—"}
          </div>
          <div className="text-xs flex gap-3 items-center">
            Statut :{" "}
            <span className={task.completed ? "text-green-600 font-bold" : "text-gray-400"}>
              {task.completed ? "Terminée" : "À faire"}
            </span>
            <button
              className={`ml-2 px-2 py-1 text-xs rounded 
                ${task.completed ? "bg-green-200 text-green-900" : "bg-gray-200 text-gray-800"}
                hover:bg-green-300 transition`}
              onClick={() => handleToggleComplete(task)}
            >
              {task.completed ? "↩️ Annuler" : "✅ Terminer"}
            </button>
            <button
              className="ml-2 px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200 transition"
              onClick={() => setTaskToEdit(task)}
            >
              ✏️ Éditer
            </button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && !loading && (
        <div className="text-gray-400 text-center mt-12">Aucune tâche pour le moment.</div>
      )}
    </div>
  );
}
