import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Ce composant gère le formulaire d'ajout et de modification de tâche.
// Il utilise des états locaux pour stocker les valeurs du formulaire.
// Quand une tâche est sélectionnée pour modification, les champs sont pré-remplis.

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

  // Remplit le formulaire si une tâche est à modifier, sinon réinitialise
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

  // Gère la soumission du formulaire (ajout ou modification)
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

// ---
// Liste des fonctions/hooks utilisés dans ce composant :
//
// - useState : Hook React permettant de créer et gérer des états locaux dans le composant (ici pour title, priority, id).
// - useEffect : Hook React qui permet d’exécuter du code après le rendu du composant ou lors de la modification de certaines valeurs (ici pour remplir ou réinitialiser le formulaire quand taskToEdit change).
// - toast (de react-toastify) : Fonction pour afficher des notifications à l’utilisateur (ici pour signaler l’ajout ou la modification d’une tâche).
//
// Ces hooks facilitent la gestion dynamique des données et des effets de bord dans les composants fonctionnels React.
