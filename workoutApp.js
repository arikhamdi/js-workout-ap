function init() {
  renderWorkouts();
  renderDays();
}

const workouts = [
  {
    name: "biceps curls",
    reps: 10,
    calories: 25
  },
  {
    name: "biceps hammer curls",
    reps: 10,
    calories: 25
  },
  {
    name: "bench press",
    reps: 10,
    calories: 50
  },
  {
    name: "pushups",
    reps: 10,
    calories: 30
  },
  {
    name: "pullups",
    reps: 5,
    calories: 50
  },
  {
    name: "sit-ups",
    reps: 25,
    calories: 50
  },
  {
    name: "squats",
    reps: 40,
    calories: 50
  },
  {
    name: "lunges",
    reps: 25,
    calories: 40
  }
];

const trainingPlan = {
  monday: [],
  tueseday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: []
}

const DAYS = Object.keys(trainingPlan);
let selectedDay = 'monday';

function renderTotalCalories() {
  document.querySelector('#calories').innerHTML = "";
  let sum = {};
  DAYS.forEach((day) => {
    sum[day] = 0;
    trainingPlan[day].forEach((exo) => {
      sum[day] += parseInt(exo.calories);
    });
  });
  DAYS.forEach((day) => {
    const listCaloriesPerDay = document.createElement('li');
    listCaloriesPerDay.innerHTML = `<li>${day}: ${sum[day]}  cal</li>`;
    document.querySelector('#calories').append(listCaloriesPerDay);
  })

}

function renderTotalReps() {
  document.querySelector('#reps').innerHTML = "";
  const totalReps = {};
  DAYS.forEach((day) => {
    trainingPlan[day].forEach((exo) => {
      const workoutKey = exo.name.replace(" ", "_");
      const { name, reps } = exo;

      if (totalReps[workoutKey] === undefined) {
        totalReps[workoutKey] = {
          name,
          reps
        };
      } else {
        totalReps[workoutKey] = {
          name,
          reps: reps + totalReps[workoutKey].reps
        };
      }
    });
  });
  const total = Object.keys(totalReps);
  total.forEach((exo) => {
    const listRep = document.createElement('li');

    listRep.innerHTML = `<li>${totalReps[exo].name} x ${totalReps[exo].reps} reps</li>`;
    document.querySelector('#reps').append(listRep);
  });
}

function renderWorkouts() {
  workouts.forEach((item, index) => {
    // Html elements created
    const listWorkout = document.createElement('li');
    const buttonAddExecices = document.createElement('button');

    buttonAddExecices.classList.add('yellowBg', 'addButton', 'addWorkoutButton');
    buttonAddExecices.setAttribute('data-index', index);
    buttonAddExecices.innerHTML = '+';

    listWorkout.innerHTML = `${item.name} x ${item.reps} - ${item.calories} cal `;
    listWorkout.append(buttonAddExecices);

    document.querySelector('#workouts').append(listWorkout);
  });

  document.querySelectorAll('.addWorkoutButton').forEach((item) => {
    item.addEventListener('click', () => {
      const index = item.attributes['data-index'].value;
      trainingPlan[selectedDay].push(workouts[index]);
      renderTrainingPlan();
      renderTotalCalories();
      renderTotalReps();
    });
  });
}


function renderDays() {
  document.querySelector("#weekDays").innerHTML = '';
  DAYS.forEach(day => {
    // creating days top menu
    const buttonDay = document.createElement('button');
    buttonDay.classList.add('dayBtn');
    if (day === selectedDay)
      buttonDay.classList.add('selectedDay');
    buttonDay.setAttribute('data-day', day);
    buttonDay.innerHTML = day;
    document.querySelector("#weekDays").append(buttonDay);
  });

  document.querySelectorAll('.dayBtn').forEach(day => {
    day.addEventListener('click', () => {
      selectedDay = day.attributes['data-day'].value;
      renderDays();
      renderTrainingPlan();
      renderTotalCalories();
      renderTotalReps();
    });
  });


}

function renderTrainingPlan() {
  // Displaying added exercises in training
  document.querySelector('#trainingPlan').innerHTML = '';
  trainingPlan[selectedDay].forEach((item, index) => {
    const listExos = document.createElement('li');
    const buttonRemoveExo = document.createElement('button');

    buttonRemoveExo.classList.add('yellowBg', 'removeButton');
    buttonRemoveExo.setAttribute('data-index', index);

    listExos.innerHTML = `${item.name} x ${item.reps}`;
    buttonRemoveExo.innerHTML = '-';

    listExos.append(buttonRemoveExo);
    document.querySelector('#trainingPlan').append(listExos);
  });

  document.querySelectorAll('.removeButton').forEach((button) => {
    button.addEventListener('click', () => {
      trainingPlan[selectedDay].splice(button.attributes['data-index'].value, 1);
      renderTrainingPlan();
      renderTotalCalories();
      renderTotalReps();
    });
  });
}





window.addEventListener('DOMContentLoaded', init);


