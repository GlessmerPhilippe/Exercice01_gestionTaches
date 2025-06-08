import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Ce composant principal gère l'affichage global de l'application et l'état de rafraîchissement/l'édition des tâches.

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  reminder?: string;
};

export default function App() {
  const [refresh, setRefresh] = useState(false); // Permet de forcer le rafraîchissement de la liste des tâches
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // Stocke la tâche à éditer

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-indigo-700 tracking-tight drop-shadow">
          Gestionnaire de tâches
        </h1>
        <TaskForm
          onAdd={() => {
            setRefresh((r) => !r);
            setTaskToEdit(null);
          }}
          taskToEdit={taskToEdit}
        />
        <TaskList
          key={String(refresh)}
          setTaskToEdit={setTaskToEdit}
        />
      </div>
    </div>
  );
}

/*
Liste des fonctions/hooks utilisés dans ce composant :

- useState : Hook React pour gérer l'état local (ici, pour forcer le rafraîchissement de la liste et pour stocker la tâche à éditer).
- ToastContainer (de react-toastify) : Composant pour afficher les notifications toast dans l'application.

Ce composant orchestre l'affichage du formulaire, de la liste des tâches et la gestion des notifications.
*/
