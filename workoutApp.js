class Utils {
  static getWorkouts() {
    return [
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
  }
}

class TrainingPlan {

  trainingPlan = {
    monday: [],
    tueseday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }

  selectedDay = 'monday';


  constructor() {
    this.infoPanel = new InfoPanel();
  }

  addWorkout(workout) {
    this.trainingPlan[this.selectedDay].push(workout);
    this.renderTrainingPlan();
    this.infoPanel.renderTotalCalories(this.trainingPlan);
    this.infoPanel.renderTotalReps(this.trainingPlan);
  }

  removeWorkout(button) {
    this.trainingPlan[this.selectedDay].splice(button, 1);
    this.renderTrainingPlan();
    this.infoPanel.renderTotalCalories(this.trainingPlan);
    this.infoPanel.renderTotalReps(this.trainingPlan);
  }

  renderTrainingPlan() {
    // Displaying added exercises in training
    document.querySelector('#trainingPlan').innerHTML = '';
    this.trainingPlan[this.selectedDay].forEach((item, index) => {
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
        this.removeWorkout(button.attributes['data-index'].value);
      });
    });
  }

  renderDays() {
    document.querySelector("#weekDays").innerHTML = '';
    const days = Object.keys(this.trainingPlan);
    days.forEach(day => {
      // creating days top menu
      const buttonDay = document.createElement('button');
      buttonDay.classList.add('dayBtn');
      if (day === this.selectedDay)
        buttonDay.classList.add('selectedDay');
      buttonDay.setAttribute('data-day', day);
      buttonDay.innerHTML = day;
      document.querySelector("#weekDays").append(buttonDay);
    });

    document.querySelectorAll('.dayBtn').forEach(day => {
      day.addEventListener('click', () => {
        this.selectedDay = day.attributes['data-day'].value;
        this.renderDays();
        this.renderTrainingPlan();
        this.infoPanel.renderTotalCalories(this.trainingPlan);
        this.infoPanel.renderTotalReps(this.trainingPlan);
      });
    });
  }

}

class Workouts {
  constructor(trainingPlan) {
    this.trainingPlanPanel = trainingPlan;
    this.days = this.trainingPlanPanel.days;
    this.workouts = Utils.getWorkouts();
    this.infoPanel = new InfoPanel();
  }

  renderWorkouts() {
    this.workouts.forEach((item, index) => {
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
        this.trainingPlanPanel.addWorkout(this.workouts[index]);
      });
    });
  }
}

class InfoPanel {

  renderTotalCalories(trainingPlan) {
    document.querySelector('#calories').innerHTML = "";
    let sum = {};
    const days = Object.keys(trainingPlan);
    days.forEach((day) => {
      sum[day] = 0;
      trainingPlan[day].forEach((exo) => {
        sum[day] += parseInt(exo.calories);
      });
    });
    days.forEach((day) => {
      const listCaloriesPerDay = document.createElement('li');
      listCaloriesPerDay.innerHTML = `<li>${day}: ${sum[day]}  cal</li>`;
      document.querySelector('#calories').append(listCaloriesPerDay);
    })

  }

  renderTotalReps(trainingPlan) {
    document.querySelector('#reps').innerHTML = "";
    const totalReps = {};
    const days = Object.keys(trainingPlan);
    days.forEach((day) => {
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
}


function init() {
  const trainingplan = new TrainingPlan();
  const workout = new Workouts(trainingplan);

  workout.renderWorkouts();
  trainingplan.renderDays();
}

window.addEventListener('DOMContentLoaded', init);


