import { useState } from 'react'
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, Calendar, User, GripVertical, Trash2, Search, Filter } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
  tags: string[]
}

interface Column {
  id: string
  title: string
  color: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#f59e0b',
    tasks: [
      { id: '1', title: 'Design system documentation', description: 'Create comprehensive design system docs', priority: 'high', assignee: 'Alex', dueDate: '2024-01-15', tags: ['design', 'docs'] },
      { id: '2', title: 'API integration', description: 'Integrate REST API endpoints', priority: 'medium', assignee: 'Sam', dueDate: '2024-01-18', tags: ['backend'] },
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: '#3b82f6',
    tasks: [
      { id: '3', title: 'User authentication', description: 'Implement OAuth2 login flow', priority: 'high', assignee: 'Jordan', dueDate: '2024-01-12', tags: ['auth', 'security'] },
      { id: '4', title: 'Dashboard widgets', description: 'Build reusable dashboard components', priority: 'low', assignee: 'Casey', dueDate: '2024-01-20', tags: ['frontend'] },
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: '#8b5cf6',
    tasks: [
      { id: '5', title: 'Code review: Payment module', description: 'Review PR #234', priority: 'medium', assignee: 'Taylor', dueDate: '2024-01-10', tags: ['review'] },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: '#22c55e',
    tasks: [
      { id: '6', title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions', priority: 'high', assignee: 'Morgan', dueDate: '2024-01-05', tags: ['devops'] },
    ]
  },
]

function SortableTask({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-surface rounded-lg p-4 border border-border shadow-sm hover:shadow-md transition-shadow cursor-default"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-text-muted hover:text-text">
            <GripVertical className="w-4 h-4" />
          </button>
          <h4 className="font-medium text-text text-sm">{task.title}</h4>
        </div>
        <button onClick={() => onDelete(task.id)} className="text-text-muted hover:text-danger transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-text-muted mb-3 ml-6">{task.description}</p>
      <div className="flex items-center gap-2 ml-6 flex-wrap">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        {task.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-surface-hover text-primary">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 ml-6 mt-3 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {task.assignee}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {task.dueDate}
        </span>
      </div>
    </div>
  )
}

function App() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeColumn = columns.find((col) => col.tasks.some((t) => t.id === active.id))
    const overColumn = columns.find((col) => col.id === over.id || col.tasks.some((t) => t.id === over.id))

    if (!activeColumn || !overColumn) return

    if (activeColumn.id === overColumn.id) {
      const oldIndex = activeColumn.tasks.findIndex((t) => t.id === active.id)
      const newIndex = activeColumn.tasks.findIndex((t) => t.id === over.id)
      if (oldIndex !== newIndex) {
        setColumns((cols) =>
          cols.map((col) =>
            col.id === activeColumn.id
              ? { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) }
              : col
          )
        )
      }
    } else {
      const task = activeColumn.tasks.find((t) => t.id === active.id)
      if (!task) return
      setColumns((cols) =>
        cols.map((col) => {
          if (col.id === activeColumn.id) return { ...col, tasks: col.tasks.filter((t) => t.id !== active.id) }
          if (col.id === overColumn.id) return { ...col, tasks: [...col.tasks, task] }
          return col
        })
      )
    }
  }

  const deleteTask = (taskId: string) => {
    setColumns((cols) =>
      cols.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      }))
    )
  }

  const addTask = (columnId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      description: 'Click to edit description',
      priority: 'medium',
      assignee: 'Unassigned',
      dueDate: new Date().toISOString().split('T')[0],
      tags: [],
    }
    setColumns((cols) =>
      cols.map((col) => (col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col))
    )
  }

  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  }))

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text mb-1">Task Board</h1>
            <p className="text-text-muted">Manage your team tasks with drag and drop</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredColumns.map((column) => (
              <div key={column.id} className="bg-surface/50 rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
                    <h3 className="font-semibold text-text">{column.title}</h3>
                    <span className="text-xs text-text-muted bg-surface-hover px-2 py-0.5 rounded-full">
                      {column.tasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => addTask(column.id)}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <SortableContext items={column.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {column.tasks.map((task) => (
                      <SortableTask key={task.id} task={task} onDelete={deleteTask} />
                    ))}
                  </div>
                </SortableContext>
              </div>
            ))}
          </div>
          <DragOverlay>
            {activeId ? (
              <div className="bg-surface rounded-lg p-4 border border-primary shadow-lg opacity-90">
                <p className="text-sm text-text">Moving task...</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

export default App
