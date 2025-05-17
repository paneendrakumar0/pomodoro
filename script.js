// Variables
let focusTime = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;
let timerInterval;
let isFocus = true;
let currentTime = focusTime;
let sessionCount = 0;

// DOM Elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const statusEl = document.getElementById('status');
const sessionsCompletedEl = document.getElementById('sessions-completed');
const taskInput = document.getElementById('task-input');
const tasksEl = document.getElementById('tasks');
const themeToggleBtn = document.getElementById('toggle-theme');

// Timer Functions
function updateDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            currentTime--;
            updateDisplay();

            if (currentTime <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;

                if (isFocus) {
                    sessionCount++;
                    sessionsCompletedEl.textContent = sessionCount;

                    if (sessionCount % 4 === 0) {
                        currentTime = longBreak;
                        statusEl.textContent = 'Long Break';
                    } else {
                        currentTime = shortBreak;
                        statusEl.textContent = 'Short Break';
                    }
                } else {
                    currentTime = focusTime;
                    statusEl.textContent = 'Focus Time';
                }
                isFocus = !isFocus;
                playSound();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    currentTime = isFocus ? focusTime : shortBreak;
    updateDisplay();
}

function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.mp3');
    audio.play();
}

// Task Management
function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        const taskEl = document.createElement('li');
        taskEl.textContent = task;
        tasksEl.appendChild(taskEl);
        taskInput.value = '';
    }
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Event Listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('add-task').addEventListener('click', addTask);
themeToggleBtn.addEventListener('click', toggleTheme);

// Initialize
updateDisplay();
