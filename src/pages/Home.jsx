import React, { useEffect, useState } from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteTodoo, DoneTodoo, getTodoo } from '../redux/slice'
import { scheduleReminder } from "../utils/reminder";

const Home = () => {


  //modal view for edit page
  const [view, setView] = useState(false)
  //state for todoo
  const { data } = useSelector(state => state.Todoo)
  const dispatch = useDispatch()
  //storing date in this
  const [date, setDate] = useState("")
  //when user clicks edit edit id goes in this
  const [editid, setEditid] = useState(null)



  //getting data from localstorage && date

useEffect(() => {
  const todos = localStorage.getItem("todos");

  if (todos) {
    const parsedTodos = JSON.parse(todos);

    dispatch(getTodoo(parsedTodos));

    parsedTodos.forEach((todo) => {
      if (!todo.done) {
        scheduleReminder(todo);
      }
    });
  }

  setDate(new Date().toLocaleDateString("en-IN"));

  if ("Notification" in window) {
    requestNotificationPermission();
  }
}, []);

const formatTime = (time) => {
  let [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
};


  //requesting permission for notification
  const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
};



  const done = data.filter(i => i.done).length
  const total = data.length

  const editHandle = (id) => {
    setEditid(id)
    setView(true)
  }

  const listItems = data.map(item => (
    <li
      key={item.id}
      className="group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200"
      style={item.done
        ? { borderColor: '#f1f0ef', background: '#fafaf9' }
        : { borderColor: '#e7e5e4', background: '#ffffff' }
      }
    >
      <span
        className="h-2 w-2 flex-shrink-0 rounded-full transition-colors"
        style={{ background: item.done ? '#d6d3d1' : '#6366f1' }}
      />

      <span
        className="flex-1 truncate text-sm transition-colors"
        style={item.done
          ? { textDecoration: 'line-through', color: '#a8a29e' }
          : { color: '#1c1917', fontWeight: 500 }
        }
      >
        {item.todoo}
      </span>

<span className="hidden sm:block text-xs text-stone-400 tabular-nums">
  {formatTime(item.startTime)} – {formatTime(item.endTime)}
</span>

      {/* Delete — rose/red */}
      <button
        onClick={() => dispatch(DeleteTodoo(item.id))}
        className="cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg p-1.5 border transition-all duration-150"
        style={{ color: '#f43f5e', background: '#fff1f2', borderColor: '#fecdd3' }}
        onMouseEnter={e => e.currentTarget.style.background = '#ffe4e6'}
        onMouseLeave={e => e.currentTarget.style.background = '#fff1f2'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      </button>

      {/* Done — emerald/green (hidden when already done) */}
      {!item.done && (
        <button
          onClick={() => dispatch(DoneTodoo(item.id))}
          className="flex items-center justify-center rounded-lg p-1.5 border transition-all duration-150"
          style={{
            color: '#34d399',
            background: '#f0fdf4',
            borderColor: '#bbf7d0',
            cursor: 'pointer'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#dcfce7'}
          onMouseLeave={e => e.currentTarget.style.background = '#f0fdf4'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      )}

      {/* Edit — amber (hidden when done) */}
      {!item.done && (
        <button
          onClick={() => editHandle(item.id)}
          className="cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg p-1.5 border transition-all duration-150"
          style={{ color: '#f59e0b', background: '#fffbeb', borderColor: '#fde68a' }}
          onMouseEnter={e => e.currentTarget.style.background = '#fef3c7'}
          onMouseLeave={e => e.currentTarget.style.background = '#fffbeb'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      )}

    </li>
  ))

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-2xl px-6 py-16">

        <header className="mb-10 pb-6 border-b border-stone-200">
          <div className="flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-500">Today</p>
                <span className="text-[11px] font-medium text-indigo-400 tabular-nums">{date}</span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-stone-900">Your tasks</h1>
            </div>
            <button
              onClick={() => setView(true)}
              className="cursor-pointer rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-indigo-300 active:scale-[0.98]"
            >
              Add task +
            </button>
          </div>

          {total > 0 && (
            <div className="mt-5">
              <div className="flex justify-between text-xs text-stone-400 mb-2">
                <span>{done} of {total} completed</span>
                <span>{Math.round((done / total) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${(done / total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {view && <Task view={view} setView={setView} editid={editid} setEditid={setEditid} />}

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-24 text-center bg-white">
            <span className="text-3xl mb-3">📋</span>
            <p className="text-sm font-medium text-stone-500">Nothing scheduled yet</p>
            <p className="mt-1 text-xs text-stone-400">Add a task to start planning your day</p>
          </div>
        ) : (
          <ol className="space-y-2">{listItems}</ol>
        )}

        


      </div>
    </div>
  )
}

export default Home