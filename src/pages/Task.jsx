import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AddTodoo, UpdateToddo } from '../redux/slice'
import { schema } from '../schema/todooSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const timeSlots = [
  { label: "6:00 AM", value: "06:00" },
  { label: "6:30 AM", value: "06:30" },
  { label: "7:00 AM", value: "07:00" },
  { label: "7:30 AM", value: "07:30" },
  { label: "8:00 AM", value: "08:00" },
  { label: "8:30 AM", value: "08:30" },
  { label: "9:00 AM", value: "09:00" },
  { label: "9:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "1:00 PM", value: "13:00" },
  { label: "1:30 PM", value: "13:30" },
  { label: "2:00 PM", value: "14:00" },
  { label: "2:30 PM", value: "14:30" },
  { label: "3:00 PM", value: "15:00" },
  { label: "3:30 PM", value: "15:30" },
  { label: "4:00 PM", value: "16:00" },
  { label: "4:30 PM", value: "16:30" },
  { label: "5:00 PM", value: "17:00" },
  { label: "5:30 PM", value: "17:30" },
  { label: "6:00 PM", value: "18:00" },
];

const Task = ({ setView, editid, setEditid }) => {

  const dispatch = useDispatch()
  const { data } = useSelector(state => state.Todoo)
  let task = ""

  editid ? task = data.find(item => item.id == editid) : task

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: task ? {
      todoo: task.todoo,
      startTime: task.startTime,
      endTime: task.endTime
    } : {}
  })

  const onSubmit = (data) => {
    if (editid) {
      const todo = { id: editid, ...data }
      dispatch(UpdateToddo(todo))
      setEditid(null)
      setView(false)
      testReminder(todo)
    } else {
      const todo = { id: Date.now(), ...data }
      dispatch(AddTodoo(todo))
      testReminder({todo:todo.todoo})
      setView(false)
    }
  }



  //testing how to send notification on time,
const testReminder = (todo ) => {
const [hours, minutes] = todo.startTime.split(":").map(Number);

const taskTime = new Date();
taskTime.setHours(hours, minutes, 0, 0);

const delay = taskTime - new Date();

if (delay > 0) {
  setTimeout(() => {
    new Notification("Todo Reminder", {
      body: todo.todoo,
    });
  }, delay);
}
};

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden" style={{ background: '#ffffff', boxShadow: '0 24px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)' }}>

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{
            borderBottom: `1px solid ${editid ? '#fde68a' : '#c7d2fe'}`,
            background: editid ? '#fffbeb' : '#eef2ff'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center"
              style={{ background: editid ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)' }}
            >
              {editid ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: editid ? '#f59e0b' : '#6366f1' }}>
                {editid ? 'Edit' : 'New'}
              </p>
              <h2 className="text-sm font-semibold text-stone-900">
                {editid ? 'Edit task' : 'Add a task'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => { setView(false); setEditid(null) }}
            className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-xl text-sm transition-all duration-150"
            style={{ color: '#a8a29e', background: '#f5f5f4', border: '1px solid #e7e5e4' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#fff1f2'
              e.currentTarget.style.color = '#f43f5e'
              e.currentTarget.style.borderColor = '#fecdd3'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#f5f5f4'
              e.currentTarget.style.color = '#a8a29e'
              e.currentTarget.style.borderColor = '#e7e5e4'
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4" style={{ background: '#ffffff' }}>

          {/* Task name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">Task</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              {...register('todoo')}
              className="w-full rounded-xl px-4 py-3 text-sm text-stone-800 outline-none transition-all duration-150 border"
              style={{
                background: '#f8f7f4',
                borderColor: errors.todoo ? '#f43f5e' : '#e7e5e4'
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = errors.todoo ? '#f43f5e' : '#6366f1'
                e.currentTarget.style.boxShadow = errors.todoo ? '0 0 0 3px rgba(244,63,94,0.1)' : '0 0 0 3px rgba(99,102,241,0.1)'
                e.currentTarget.style.background = '#ffffff'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = errors.todoo ? '#f43f5e' : '#e7e5e4'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.background = '#f8f7f4'
              }}
            />
            {errors.todoo && (
              <p className="flex items-center gap-1 text-xs" style={{ color: '#f43f5e' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errors.todoo.message}
              </p>
            )}
          </div>

          
{/* Time row */}
<div className="grid grid-cols-2 gap-3">
  {[
    { label: "Start", name: "startTime" },
    { label: "End", name: "endTime" },
  ].map(({ label, name }) => (
    <div key={name} className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
        {label}
      </label>

      <select
        {...register(name)}
        className="w-full rounded-xl px-3 py-3 text-sm text-stone-700 border outline-none appearance-none cursor-pointer transition-all duration-150"
        style={{
          background: "#f8f7f4",
          borderColor: errors[name] ? "#f43f5e" : "#e7e5e4",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = errors[name]
            ? "#f43f5e"
            : "#6366f1";
          e.currentTarget.style.boxShadow = errors[name]
            ? "0 0 0 3px rgba(244,63,94,0.1)"
            : "0 0 0 3px rgba(99,102,241,0.1)";
          e.currentTarget.style.background = "#ffffff";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = errors[name]
            ? "#f43f5e"
            : "#e7e5e4";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.background = "#f8f7f4";
        }}
      >
        <option value="">— pick —</option>

        {timeSlots.map((slot) => (
          <option key={slot.value} value={slot.value}>
            {slot.label}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p
          className="flex items-center gap-1 text-xs"
          style={{ color: "#f43f5e" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>

          {errors[name].message}
        </p>
      )}
    </div>
  ))}
</div>


          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => { setView(false); setEditid(null) }}
              className="cursor-pointer flex-1 rounded-xl px-4 py-3 text-sm font-medium border transition-all duration-200"
              style={{ color: '#78716c', background: '#ffffff', borderColor: '#e7e5e4' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f8f7f4'
                e.currentTarget.style.borderColor = '#d6d3d1'
                e.currentTarget.style.color = '#44403c'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.borderColor = '#e7e5e4'
                e.currentTarget.style.color = '#78716c'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: editid ? '#10b981' : '#6366f1',
                boxShadow: editid
                  ? '0 4px 14px rgba(16,185,129,0.3)'
                  : '0 4px 14px rgba(99,102,241,0.3)'
              }}
              onMouseEnter={e => e.currentTarget.style.background = editid ? '#059669' : '#4f46e5'}
              onMouseLeave={e => e.currentTarget.style.background = editid ? '#10b981' : '#6366f1'}
            >
              {editid ? 'Update task' : 'Add task'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Task