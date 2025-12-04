document.addEventListener('DOMContentLoaded', function(){
  // Simple dashboard features: schedule editor, break timer, notifications
  const scheduleKey = 'mf_schedule_v1';

  // Create UI containers
  const container = document.querySelector('.dashboard');
  if(!container) return;

  // Notifications are handled centrally by lang.js (window.mfNotify)

  // Schedule editor
  const schedBox = document.createElement('div');
  schedBox.className = 'schedule-box';
  schedBox.innerHTML = `
    <h3 data-i18n="dashboard.schedule">Horario adaptativo</h3>
    <div class="schedule-form">
      <input id="task-name" placeholder="Tarea" />
      <input id="task-time" type="time" />
      <input id="task-duration" type="number" min="5" value="30" />
      <button id="add-task" class="btn-primary">Agregar</button>
    </div>
    <ul id="task-list" class="task-list"></ul>
    <div class="ai-controls">
      <label>IA - Sugiere pausas cada <span id="ai-interval">30</span> min</label>
      <input id="ai-interval-range" type="range" min="15" max="120" value="30" />
    </div>
  `;
  container.appendChild(schedBox);

  // set localized label for add button if available
  if(window.getI18n){ addBtn.textContent = window.getI18n('dashboard.task.add'); }
  const taskListEl = schedBox.querySelector('#task-list');
  const addBtn = schedBox.querySelector('#add-task');
  const nameInput = schedBox.querySelector('#task-name');
  const timeInput = schedBox.querySelector('#task-time');
  const durInput = schedBox.querySelector('#task-duration');
  const aiRange = schedBox.querySelector('#ai-interval-range');
  const aiIntervalLabel = schedBox.querySelector('#ai-interval');

  function loadSchedule(){
    const raw = localStorage.getItem(scheduleKey);
    try{
      return raw ? JSON.parse(raw) : { tasks: [], aiInterval: 30 };
    }catch(e){ return { tasks: [], aiInterval: 30 }; }
  }
  function saveSchedule(state){ localStorage.setItem(scheduleKey, JSON.stringify(state)); }

  let state = loadSchedule();
  aiRange.value = state.aiInterval || 30;
  aiIntervalLabel.textContent = String(state.aiInterval || 30);

  function renderTasks(){
    taskListEl.innerHTML = '';
    state.tasks.forEach((t, idx)=>{
      const li = document.createElement('li');
      li.className = 'task-item';
      const left = document.createElement('div');
      left.innerHTML = `<strong>${t.name}</strong> <small>${t.time} • ${t.duration}min</small>`;
      const actions = document.createElement('div'); actions.className='task-actions';
      const startBtn = document.createElement('button'); startBtn.className='start-task'; startBtn.textContent = window.getI18n ? window.getI18n('dashboard.task.start') : 'Start';
      const removeBtn = document.createElement('button'); removeBtn.className='remove-task'; removeBtn.textContent = window.getI18n ? window.getI18n('dashboard.task.remove') : 'Remove';
      startBtn.addEventListener('click', ()=>{ startTaskTimer(t); });
      removeBtn.addEventListener('click', ()=>{ state.tasks.splice(idx,1); saveSchedule(state); renderTasks(); });
      actions.appendChild(startBtn); actions.appendChild(removeBtn);
      li.appendChild(left); li.appendChild(actions);
      taskListEl.appendChild(li);
    });
  }

  addBtn.addEventListener('click', ()=>{
    const name = nameInput.value.trim() || 'Tarea';
    const time = timeInput.value || new Date().toTimeString().slice(0,5);
    const duration = Math.max(5, parseInt(durInput.value)||30);
    state.tasks.push({ name, time, duration });
    saveSchedule(state); renderTasks();
    nameInput.value=''; timeInput.value=''; durInput.value='30';
    const t = window.getI18n ? window.getI18n('dashboard.task.added') : 'Tarea añadida';
    showToast(t, 'info');
    if(window.mfNotify) window.mfNotify(window.getI18n ? window.getI18n('dashboard.task.added') : 'Tarea añadida', name + ' • ' + time, 'info');
  });

  aiRange.addEventListener('input', ()=>{ aiIntervalLabel.textContent = aiRange.value; state.aiInterval = parseInt(aiRange.value); saveSchedule(state); });

  renderTasks();

  // Timer (countdown)
  const timerBox = document.createElement('div');
  timerBox.className = 'timer-box';
  timerBox.innerHTML = `
    <h3 data-i18n="dashboard.timer">Temporizador de descanso</h3>
    <div class="progress-container">
      <svg class="progress-ring" width="120" height="120" aria-hidden="true">
        <circle class="progress-ring__bg" stroke="#eee" stroke-width="8" fill="transparent" r="52" cx="60" cy="60"></circle>
        <circle class="progress-ring__circle" stroke="#2a5298" stroke-width="8" fill="transparent" r="52" cx="60" cy="60" stroke-linecap="round"></circle>
      </svg>
      <div class="timer-display"><span id="timer-min">00</span>:<span id="timer-sec">00</span></div>
    </div>
    <div class="timer-controls"><button id="timer-start" class="btn-primary">Start</button><button id="timer-pause">Pause</button><button id="timer-reset">Reset</button></div>
  `;
  container.appendChild(timerBox);

  let timerInterval = null;
  let remaining = 0; // seconds
  const timerMin = timerBox.querySelector('#timer-min');
  const timerSec = timerBox.querySelector('#timer-sec');
  const btnStart = timerBox.querySelector('#timer-start');
  const btnPause = timerBox.querySelector('#timer-pause');
  const btnReset = timerBox.querySelector('#timer-reset');
  const ringCircle = timerBox.querySelector('.progress-ring__circle');
  let timerTotalSeconds = 0;
  // initialize ring
  let ringCirc = null;
  if(ringCircle){
    const r = parseFloat(ringCircle.getAttribute('r') || 52);
    ringCirc = 2 * Math.PI * r;
    ringCircle.style.transition = 'stroke-dashoffset 1s linear';
    ringCircle.style.strokeDasharray = `${ringCirc} ${ringCirc}`;
    ringCircle.style.strokeDashoffset = ringCirc;
  }

  function formatTime(s){ const m = Math.floor(s/60); const sec = s%60; return [String(m).padStart(2,'0'), String(sec).padStart(2,'0')]; }
  function updateTimerDisplay(){ const [m,sec] = formatTime(remaining); timerMin.textContent=m; timerSec.textContent=sec; 
    if(ringCircle && timerTotalSeconds>0){ const frac = Math.max(0, Math.min(1, remaining / timerTotalSeconds)); const offset = ringCirc * (1 - frac); ringCircle.style.strokeDashoffset = offset; }
    else if(ringCircle){ ringCircle.style.strokeDashoffset = ringCirc; }
  }

  function startTimer(seconds){ remaining = seconds; timerTotalSeconds = seconds; updateTimerDisplay(); stopTimer(); timerInterval = setInterval(()=>{ remaining--; if(remaining<=0){ stopTimer(); onTimerEnd(); } updateTimerDisplay(); }, 1000); }
  function stopTimer(){ if(timerInterval) clearInterval(timerInterval); timerInterval = null; }
  function onTimerEnd(){
    // legacy: keep toast + system notify
    showToast(window.getI18n ? window.getI18n('dashboard.timer.finished') : 'Descanso finalizado', 'success');
    notify(window.getI18n ? window.getI18n('dashboard.timer.finished') : 'Break finished', window.getI18n ? window.getI18n('dashboard.reward.msg') : 'Your break is over — back to work');
    playBeep();
    // and add a persistent notification in center
    if(window.mfNotify) window.mfNotify(window.getI18n ? window.getI18n('dashboard.timer.finished') : 'Descanso finalizado', window.getI18n ? window.getI18n('dashboard.reward.msg') : 'Your break is over — back to work', 'success');
  }
  // use notification manager for timer end as well
  function onTimerEndNotify(){
    const title = window.getI18n ? window.getI18n('dashboard.timer.finished') : 'Descanso finalizado';
    const body = window.getI18n ? window.getI18n('dashboard.reward.msg') : 'Your break is over — back to work';
    if(window.mfNotify) window.mfNotify(title, body, 'success');
  }

  // localize control labels if possible
  if(window.getI18n){ btnStart.textContent = window.getI18n('dashboard.timer.start'); btnPause.textContent = window.getI18n('dashboard.timer.pause'); btnReset.textContent = window.getI18n('dashboard.timer.reset_btn'); }
  btnStart.addEventListener('click', ()=>{ // default 5 minutes or AI interval
    const ai = state.aiInterval || 30;
    const defaultSeconds = 60 * 5; // small break default
    startTimer(defaultSeconds);
    showToast(window.getI18n ? window.getI18n('dashboard.timer.started') : 'Temporizador iniciado', 'info');
  });
  btnPause.addEventListener('click', ()=>{ stopTimer(); showToast(window.getI18n ? window.getI18n('dashboard.timer.paused') : 'Temporizador pausado', 'info'); });
  btnReset.addEventListener('click', ()=>{ stopTimer(); remaining = 0; timerTotalSeconds = 0; updateTimerDisplay(); showToast(window.getI18n ? window.getI18n('dashboard.timer.reset') : 'Temporizador reiniciado', 'info'); });

  // When starting a task, optionally start a countdown equal to task.duration
  function startTaskTimer(task){ startTimer(task.duration * 60); showToast((window.getI18n ? window.getI18n('dashboard.task.starting') : 'Iniciando tarea: ') + task.name, 'info'); }

  // Notifications & toasts
  const toastRoot = document.createElement('div'); toastRoot.className='toast-root'; document.body.appendChild(toastRoot);
  function showToast(text, type){
    const t = document.createElement('div'); t.className = 'toast '+(type||'info'); t.textContent = text; toastRoot.appendChild(t);
    setTimeout(()=>{ t.classList.add('visible'); }, 50);
    setTimeout(()=>{ t.classList.remove('visible'); setTimeout(()=>t.remove(),300); }, 5000);
  }

  function notify(title, body){
    if('Notification' in window){
      if(Notification.permission === 'granted'){ new Notification(title, { body }); }
      else if(Notification.permission !== 'denied'){ Notification.requestPermission().then(p=>{ if(p==='granted') new Notification(title,{body}); }); }
    }
  }

  function playBeep(){ try{ const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.type='sine'; o.connect(g); g.connect(ctx.destination); o.frequency.value = 880; g.gain.value = 0.1; o.start(); setTimeout(()=>{ o.stop(); ctx.close(); }, 400); }catch(e){ console.error('Audio error', e); } }

  // Small alerts panel for HU07/HU20: attention alert, rest alert, reward
  const notifBox = document.createElement('div'); notifBox.className='notif-box'; notifBox.innerHTML = `
    <h3 data-i18n="dashboard.notifications">Notificaciones</h3>
    <div class="notif-actions">
      <button id="btn-rest-alert" class="btn-primary">Aviso de descanso</button>
      <button id="btn-attention" class="btn-primary">Alerta por no atención</button>
      <button id="btn-reward" class="btn-primary">Recompensa</button>
    </div>
  `;
  container.appendChild(notifBox);
  // localize notif buttons/text
  const btnRest = notifBox.querySelector('#btn-rest-alert');
  const btnAtt = notifBox.querySelector('#btn-attention');
  const btnReward = notifBox.querySelector('#btn-reward');
  if(window.getI18n){ btnRest.textContent = window.getI18n('dashboard.notif.rest'); btnAtt.textContent = window.getI18n('dashboard.notif.attention'); btnReward.textContent = window.getI18n('dashboard.notif.reward'); }
  btnRest.addEventListener('click', ()=>{ showToast(window.getI18n ? window.getI18n('dashboard.notif.rest') : 'Es hora de descansar', 'warning'); notify(window.getI18n ? window.getI18n('dashboard.notif.rest') : 'Time to rest', window.getI18n ? window.getI18n('dashboard.timer.started') : 'Take a short break'); playBeep(); });
  btnAtt.addEventListener('click', ()=>{ showToast(window.getI18n ? window.getI18n('dashboard.notif.attention') : 'No estás prestando atención', 'warning'); notify(window.getI18n ? window.getI18n('dashboard.notif.attention') : 'Attention', window.getI18n ? window.getI18n('dashboard.notif.attention') : 'We detected low attention'); playBeep(); });
  btnReward.addEventListener('click', ()=>{ showToast(window.getI18n ? window.getI18n('dashboard.reward.msg') : '¡Felicidades! +10 XP', 'success'); notify(window.getI18n ? window.getI18n('dashboard.notif.reward') : 'Reward', window.getI18n ? window.getI18n('dashboard.reward.msg') : 'You earned 10 XP'); playBeep(); });

});
