import { useEffect, useState } from 'react';
import { PageLayout, PageCard } from '../layout/PageLayout';
import { Button } from '@carnica/components/app';
import { IconTrash } from '@carnica/icons/actions/IconTrash';
import { useUser } from '../lib/UserContext';
import {
  fetchTasks,
  createTask,
  toggleTask,
  deleteTask,
  type Task,
} from '../lib/notesRepo';

export function NotesPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const isEditor = user.role === 'editor';

  useEffect(() => {
    if (!isEditor) return;
    let cancelled = false;

    fetchTasks(user.email).then((list) => {
      if (!cancelled) {
        setTasks(list);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [user.email, isEditor]);

  if (!isEditor) {
    return (
      <PageLayout title="заметки" subtitle="приватный todo-list">
        <PageCard>
          <p className="text-body-sm text-bee-content-secondary">
            заметки доступны только редакторам. зайди под аккаунтом dima или vita
          </p>
        </PageCard>
      </PageLayout>
    );
  }

  async function handleAdd() {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    const created = await createTask(user.email, text);
    if (created) setTasks((prev) => [created, ...prev]);
  }

  async function handleToggle(t: Task) {
    setTasks((prev) =>
      prev
        .map((x) =>
          x.id === t.id
            ? { ...x, done: !t.done, completedAt: !t.done ? new Date().toISOString() : null }
            : x
        )
        .sort(sortFn)
    );
    await toggleTask(t.id, !t.done);
  }

  async function handleDelete(t: Task) {
    setTasks((prev) => prev.filter((x) => x.id !== t.id));
    await deleteTask(t.id);
  }

  const undone = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <PageLayout
      title="заметки"
      subtitle={`что ещё нужно сделать · только твои задачи · ${user.displayName}`}
    >
      <PageCard>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="изменить размер желтой кнопки"
            className="flex-1 min-w-0 h-12 px-4 rounded-pill text-body-sm bg-bee-el-secondary text-bee-content-primary placeholder-bee-content-tertiary focus:outline-none"
          />
          <div className="shrink-0">
            <Button
              appearance="default"
              priority="primary"
              size="medium"
              state={draft.trim().length === 0 ? 'disabled' : 'default'}
              onClick={handleAdd}
            >
              добавить
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-body-sm text-bee-content-tertiary">загружаем…</p>
        ) : tasks.length === 0 ? (
          <p className="text-body-sm text-bee-content-tertiary">
            пока пусто. добавь первую задачу
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {undone.map((t) => (
              <TaskRow key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
            {done.length > 0 ? (
              <div className="mt-4 flex flex-col gap-1">
                <span className="px-2 text-body-sm text-bee-content-secondary">
                  сделано
                </span>
                {done.map((t) => (
                  <TaskRow key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete} />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </PageCard>
    </PageLayout>
  );
}

function TaskRow({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (t: Task) => void;
  onDelete: (t: Task) => void;
}) {
  return (
    <div className="group flex items-center gap-3 py-2 px-2 -mx-2 rounded-2xl hover:bg-bee-el-secondary transition-colors">
      <button
        type="button"
        onClick={() => onToggle(task)}
        aria-pressed={task.done}
        aria-label={task.done ? 'отметить как невыполненное' : 'отметить как выполненное'}
        className={`shrink-0 w-6 h-6 rounded-full transition-colors ${
          task.done
            ? 'bg-bee-yellow'
            : 'border-2 border-bee-border-primary hover:border-bee-content-primary'
        }`}
      />
      <span
        className={`flex-1 text-body-sm ${
          task.done ? 'line-through text-bee-content-tertiary' : 'text-bee-content-primary'
        }`}
      >
        {task.text}
      </span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center">
        <Button
          appearance="default"
          view="icon"
          priority="tertiary"
          size="small"
          icon={<IconTrash />}
          aria-label="удалить задачу"
          onClick={() => onDelete(task)}
        />
      </span>
    </div>
  );
}

function sortFn(a: Task, b: Task): number {
  if (a.done !== b.done) return a.done ? 1 : -1;
  return b.createdAt.localeCompare(a.createdAt);
}
