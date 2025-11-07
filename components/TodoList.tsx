import React, { useState } from 'react';
import { Task } from '../types';
import { PlusIcon, TrashIcon } from './Icons';
import { tasks as initialTasks } from '../data';


const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [newTaskText, setNewTaskText] = useState('');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;
        const newTask: Task = {
            id: Date.now(),
            text: newTaskText,
            completed: false,
        };
        setTasks([newTask, ...tasks]);
        setNewTaskText('');
    };

    const handleToggleTask = (id: number) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);

    return (
        <div className="bg-secondary p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-text-primary text-center">My To-Do List</h2>
            <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-grow bg-accent border-transparent text-text-primary rounded-lg p-3 focus:ring-2 focus:ring-highlight focus:outline-none"
                />
                <button type="submit" className="bg-highlight text-white font-bold p-3 rounded-lg hover:opacity-90 flex items-center justify-center">
                    <PlusIcon />
                    <span className="ml-2 hidden sm:inline">Add Task</span>
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary border-b-2 border-accent pb-2">Pending ({pendingTasks.length})</h3>
                <ul className="space-y-3">
                    {pendingTasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between bg-primary p-3 rounded-lg">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task.id)}
                                    className="h-5 w-5 rounded border-gray-300 text-highlight focus:ring-highlight"
                                />
                                <span className="ml-3 text-text-primary">{task.text}</span>
                            </div>
                            <button onClick={() => handleDeleteTask(task.id)} className="text-danger hover:opacity-80 p-2 rounded-full hover:bg-black/10">
                                <TrashIcon />
                            </button>
                        </li>
                    ))}
                    {pendingTasks.length === 0 && <p className="text-text-secondary text-center p-4">All tasks are done!</p>}
                </ul>

                <h3 className="text-xl font-semibold text-text-primary border-b-2 border-accent pb-2 mt-8">Completed ({completedTasks.length})</h3>
                <ul className="space-y-3">
                    {completedTasks.map(task => (
                        <li key={task.id} className="flex items-center justify-between bg-primary p-3 rounded-lg opacity-60">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task.id)}
                                    className="h-5 w-5 rounded border-gray-300 text-highlight focus:ring-highlight"
                                />
                                <span className="ml-3 text-text-primary line-through">{task.text}</span>
                            </div>
                             <button onClick={() => handleDeleteTask(task.id)} className="text-danger hover:opacity-80 p-2 rounded-full hover:bg-black/10">
                                <TrashIcon />
                            </button>
                        </li>
                    ))}
                     {completedTasks.length === 0 && <p className="text-text-secondary text-center p-4">No completed tasks yet.</p>}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
