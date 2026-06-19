export const scheduleReminder = (todo) => {
  if (Notification.permission !== "granted") return;

  const [hours, minutes] = todo.startTime.split(":").map(Number);

  const taskTime = new Date();
  taskTime.setHours(hours, minutes, 0, 0);

  const delay = taskTime - new Date();

  if (delay <= 0) return;

  setTimeout(() => {
    new Notification("Todo Reminder", {
      body: todo.todoo,
    });
  }, delay);
};