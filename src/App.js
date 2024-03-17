import React, { useState } from 'react';
import './styles.css';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [goal, setGoal] = useState(null);

  const logWorkout = () => {
    const exercise = document.getElementById('exercise').value;
    const duration = parseInt(document.getElementById('duration').value);
    const intensity = document.getElementById('intensity').value;

    if (exercise && !isNaN(duration) && intensity) {
      const newWorkout = { exercise, duration, intensity };
      setWorkouts([...workouts, newWorkout]);
      updateWorkoutRecords();
      updateProgress();
      alert('Workout logged successfully!');
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const handleSetGoal = () => {
    const target = document.getElementById('target').value;
    const frequency = parseInt(document.getElementById('frequency').value);

    if (target && !isNaN(frequency)) {
      const newGoal = { target, frequency };
      setGoal(newGoal);
      updateProgress();
      alert('Goal set successfully!');
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const updateProgress = () => {
    const progressElement = document.getElementById('goal-progress');
  
    if (goal === null) {
      progressElement.textContent = 'No goals set';
      return;
    }

    let completedWorkouts = 0;
    workouts.forEach(workout => {
      if (workout.intensity === 'high') {
        completedWorkouts++;
      }
    });

    const percentComplete = Math.round((completedWorkouts / goal.frequency) * 100);
    progressElement.textContent = `Goal: ${goal.target}, Progress: ${percentComplete}%`;
  };

  const updateWorkoutRecords = () => {
    const workoutListElement = document.getElementById('workout-list');
    workoutListElement.innerHTML = '';

    workouts.forEach((workout, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Workout ${index + 1}: ${workout.exercise} (${workout.duration} mins, ${workout.intensity})`;
      workoutListElement.appendChild(listItem);
    });
  };

  const resetForm = (type) => {
    if (type === 'log') {
      document.getElementById('exercise').value = '';
      document.getElementById('duration').value = '';
      document.getElementById('intensity').value = '';
    } else if (type === 'goal') {
      document.getElementById('target').value = '';
      document.getElementById('frequency').value = '';
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Fitness Tracker</h1>
      </header>
      <div className="content">
        <div className="form-section">
          <h2>Log Workout</h2>
          <input type="text" id="exercise" placeholder="Exercise" />
          <input type="text" id="duration" placeholder="Duration (minutes)" />
          <input type="text" id="intensity" placeholder="Intensity (low, moderate, high)" />
          <button onClick={logWorkout}>Log Workout</button>
          <button onClick={() => resetForm('log')}>Reset</button>
        </div>
        <div className="form-section">
          <h2>Set Goal</h2>
          <input type="text" id="target" placeholder="Target (e.g., weight)" />
          <input type="text" id="frequency" placeholder="Exercise Frequency (per week)" />
          <button onClick={handleSetGoal}>Set Goal</button>
          <button onClick={() => resetForm('goal')}>Reset</button>
        </div>
        <div className="progress-section">
          <h2>Progress</h2>
          <p id="goal-progress">No goals set</p>
        </div>
      </div>
      <div className="workout-records">
        <h2>Workout Records</h2>
        <ul id="workout-list"></ul>
      </div>
    </div>
  );
}

export default App;
