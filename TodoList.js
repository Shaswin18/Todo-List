// components/TodoList.js
import { useState, useEffect } from 'react';

const TodoList = () => {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('education');
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.0);

  useEffect(() => {
    const savedActivities = JSON.parse(localStorage.getItem('activities'));
    if (savedActivities) {
      setActivities(savedActivities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = { activity, price, type, bookingRequired, accessibility };
    setActivities([...activities, newActivity]);
    setActivity('');
    setPrice('');
    setType('education');
    setBookingRequired(false);
    setAccessibility(0.0);
  };

  const handleDelete = (index) => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <h2>Total Items: {activities.length}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="education">Education</option>
          <option value="recreational">Recreational</option>
          <option value="social">Social</option>
          <option value="diy">DIY</option>
          <option value="charity">Charity</option>
          <option value="cooking">Cooking</option>
          <option value="relaxation">Relaxation</option>
          <option value="music">Music</option>
          <option value="busywork">Busywork</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={(e) => setBookingRequired(e.target.checked)}
          />
          Booking Required
        </label>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.1"
          value={accessibility}
          onChange={(e) => setAccessibility(Number(e.target.value))}
        />
        <button type="submit">Add Activity</button>
      </form>
      <ul>
        {activities.map((item, index) => (
          <li key={index}>
            {item.activity} - ${item.price} - {item.type}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;