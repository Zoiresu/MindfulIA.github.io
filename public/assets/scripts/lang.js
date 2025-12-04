// Simple i18n script: translations and DOM application
(function(){
  const translations = {
    es: {
      'nav.home': 'Inicio',
      'nav.nosotros': 'Nosotros',
      'nav.blog': 'Blog',
      'nav.faqs': 'FAQs',
      'nav.reviews': 'Reseñas',
      'nav.login': 'Iniciar sesión',
      'nav.register': 'Registrarse',

      'hero.title': 'Inspira. Conecta. Sana.',
      'hero.subtitle': 'Tu asistente para el bienestar digital',
      'hero.cta': 'Regístrate gratis',

      'projects.title': 'Algunos proyectos',
      'projects.desc': 'Trabajamos con empresas y usuarios para integrar hábitos digitales saludables. Estas son algunas implementaciones y casos de uso.',

      'services.title': 'Funciones y servicios',
      'services.desc': 'Ofrecemos aplicaciones móviles y web, recomendaciones en tiempo real y herramientas para gestionar descansos y hábitos digitales.',
      'services.mobile': 'Aplicación móvil',
      'services.mobile.desc': 'Notificaciones personalizadas, chat con la IA y control de pausas durante tu jornada.',
      'services.web': 'Plataforma web',
      'services.web.desc': 'Panel de control con métricas, exportes y configuración de horarios.',
      'services.recs': 'Recomendaciones',
      'services.recs.desc': 'Sugerencias de autocuidado y rutinas personalizadas basadas en tu comportamiento digital.',

      'reviews.title': 'Lo que otros dicen:',

      // dashboard
      'dashboard.title': 'Panel - Mindful-AI',
      'dashboard.welcome': 'Bienvenido al panel',
      'dashboard.lead': 'Bienvenido a tu panel. Aquí podrás ver tu actividad y recomendaciones personalizadas.',
      'dashboard.activity': 'Actividad reciente',
      'dashboard.recs': 'Recomendaciones',
      'dashboard.schedule': 'Horario adaptativo',
      'dashboard.timer': 'Temporizador de descanso',
      'dashboard.notifications': 'Notificaciones',
      'dashboard.task.added':'Tarea añadida',
      'dashboard.task.add':'Agregar',
      'dashboard.task.start':'Iniciar',
      'dashboard.task.remove':'Eliminar',
      'dashboard.task.starting':'Iniciando tarea: ',
      'dashboard.timer.started':'Temporizador iniciado',
      'dashboard.timer.paused':'Temporizador pausado',
      'dashboard.timer.reset':'Temporizador reiniciado',
      'dashboard.timer.finished':'Descanso finalizado',
      'dashboard.timer.start':'Iniciar',
      'dashboard.timer.pause':'Pausa',
      'dashboard.timer.reset_btn':'Reiniciar',
      'dashboard.notif.rest':'Aviso de descanso',
      'dashboard.notif.attention':'Alerta por no atención',
      'dashboard.notif.reward':'Recompensa',
      'dashboard.reward.msg': '¡Felicidades! +10 XP',
      'notif.sound':'Sonido',
      'notif.system':'Sistema',
      'notif.clear':'Limpiar',
      'notif.mark':'Marcar',
      'notif.none':'No hay notificaciones',

      'contact.title': 'Únete a nuestro boletín',
      'contact.desc': 'Recibe noticias, actualizaciones y consejos para mejorar tu bienestar digital.',
      'contact.email.placeholder': 'Email',
      'contact.subscribe': 'Suscribirse ahora',

      'footer.copy': 'Copyright(C) 2020',
      'footer.allrights': 'Todos los derechos reservados.',

      // login/register
      'login.welcome':'Bienvenido de vuelta',
      'login.sub':'Introduce tus credenciales para acceder a tu cuenta y continuar donde lo dejaste.',
      'login.noaccount':'¿No tienes cuenta? Regístrate aquí',
      'login.title':'Iniciar sesión',
      'login.email':'Email',
      'login.password':'Contraseña',
      'login.remember':'Recuérdame',
      'login.btn':'Iniciar sesión',

      'register.hero.title':'Aprende sobre ti, en esta nueva IA, Evoluciona como individuo',
      'register.hero.sub':'Mindful-AI es la IA que cada uno necesita en su día a día como un psicólogo de bolsillo.',
      'register.card.title':'Comienza ahora',
      'register.name':'Nombre',
      'register.lastname':'Apellido',
      'register.email':'Email',
      'register.country':'País',
      'register.phone':'Teléfono',
      'register.submit':'Empieza en Mindful-AI',

      'blog.title':'Blog',
      'blog.lead':'Noticias, consejos y recursos sobre bienestar digital y Mindful-AI.',
      'blog.readmore':'Leer más',

      'faqs.title':'Preguntas frecuentes',
      'faqs.lead':'Aquí respondemos las preguntas más comunes sobre Mindful-AI. Si no encuentras lo que buscas, contáctanos.',
      'faqs.q1.question':'1. ¿Qué es Mindful IA?',
      'faqs.q1.answer':'Mindful IA es un sistema web y móvil que utiliza inteligencia artificial para detectar señales tempranas de estrés, ansiedad y depresión mediante el análisis de los hábitos digitales y los patrones de comportamiento de los usuarios.',
      'faqs.q2.question':'2. ¿En qué ayuda Mindful IA a los usuarios?',
      'faqs.q2.answer':'Mindful IA ayuda a los usuarios enviándoles alertas preventivas, ofreciéndoles recomendaciones personalizadas y brindándoles opciones rápidas de autocuidado para favorecer su bienestar emocional.',
      'faqs.q3.question':'3. ¿Por qué es importante Mindful IA?',
      'faqs.q3.answer':'Mindful IA es importante porque promueve la detección temprana de problemas de salud mental, lo que permite a los usuarios actuar con mayor rapidez y mejorar su salud emocional en general.',
      'faqs.q4.question':'4. ¿Cómo justifican las entrevistas la necesidad de una IA que gestione descansos y hábitos digitales?',
      'faqs.q4.answer':'Porque la mayoría usa la computadora entre 4 y 10 horas, muchos no toman descansos y varios presentan fatiga o dificultad para desconectarse. Además, todos mostraron interés en una IA que organice sus tiempos y se adapte a su rutina.',
      'faqs.q5.question':'5. ¿Qué diferencia a Mindful IA de competidores como RescueTime o ClickUp IA?',
      'faqs.q5.answer':'Mindful IA no solo mide productividad, sino que detecta estrés, ansiedad y depresión, ofrece recomendaciones emocionales y está adaptada al contexto peruano, a diferencia de las apps generales de tiempo o tareas.',
      'faqs.q6.question':'6. ¿Cómo se valida que la solución responde a necesidades reales?',
      'faqs.q6.answer':'Porque se usaron Needfinding y entrevistas que mostraron necesidades como personalización, pausas, manejo emocional y privacidad. Las User Stories integran exactamente esas demandas del usuario.',
      'faqs.q7.question':'7. ¿Cómo utilizo MindfulIA en mi ordenador?',
      'faqs.q7.answer':'Para tener a MindfulIA en su ordenador primero necesita descargarla; una vez descargada debe crearse una cuenta. Finalmente, inicie sesión y podrá utilizar normalmente la aplicación.',
      'faqs.q8.question':'8. ¿La aplicación tendrá alguna micro-transacción por su uso?',
      'faqs.q8.answer':'La aplicación de MindfulIA no tendrá ningún tipo de costo para descargar la aplicación o para generar los horarios. Si en algún momento aparece una advertencia para realizar algún tipo de pago, por favor descargue nuevamente la aplicación por medios legítimos.',

      'about.title':'Nosotros',
      'about.lead':'MindfulIA es una IA que se centra en el bienestar mental del usuario. Nuestra misión es promover la salud emocional mediante detección temprana y recomendaciones personalizadas.',
      'about.mission':'Nuestra misión',
      'about.vision':'Nuestra visión',
      'about.values':'Valores',
      'about.values.1':'Privacidad y seguridad',
      'about.values.2':'Empatía y respeto',
      'about.values.3':'Transparencia',
      'about.values.4':'Innovación responsable'
    },
    en: {
      'nav.home': 'Home',
      'nav.nosotros': 'About',
      'nav.blog': 'Blog',
      'nav.faqs': 'FAQs',
      'nav.reviews': 'Reviews',
      'nav.login': 'Login',
      'nav.register': 'Register',

      'hero.title': 'Inspire. Connect. Heal.',
      'hero.subtitle': 'Your assistant for digital wellbeing',
      'hero.cta': 'Sign up free',

      'projects.title': 'Some projects',
      'projects.desc': 'We work with companies and users to integrate healthy digital habits. These are some implementations and use cases.',

      'services.title': 'Features & Services',
      'services.desc': 'We offer mobile and web apps, real-time recommendations and tools to manage breaks and digital habits.',
      'services.mobile': 'Mobile app',
      'services.mobile.desc': 'Personalized notifications, AI chat and break controls during your workday.',
      'services.web': 'Web platform',
      'services.web.desc': 'Dashboard with metrics, exports and schedule settings.',
      'services.recs': 'Recommendations',
      'services.recs.desc': 'Self-care suggestions and personalized routines based on your digital behavior.',

      'reviews.title': 'What others say:',

      // dashboard
      'dashboard.title': 'Dashboard - Mindful-AI',
      'dashboard.welcome': 'Welcome to the dashboard',
      'dashboard.lead': 'Welcome to your dashboard. Here you can see activity and personalized recommendations.',
      'dashboard.activity': 'Recent activity',
      'dashboard.recs': 'Recommendations',
      'dashboard.schedule': 'Adaptive Schedule',
      'dashboard.timer': 'Break Timer',
      'dashboard.notifications': 'Notifications',
      'dashboard.task.added':'Task added',
      'dashboard.task.add':'Add',
      'dashboard.task.start':'Start',
      'dashboard.task.remove':'Remove',
      'dashboard.task.starting':'Starting task: ',
      'dashboard.timer.started':'Timer started',
      'dashboard.timer.paused':'Timer paused',
      'dashboard.timer.reset':'Timer reset',
      'dashboard.timer.finished':'Break finished',
      'dashboard.timer.start':'Start',
      'dashboard.timer.pause':'Pause',
      'dashboard.timer.reset_btn':'Reset',
      'dashboard.notif.rest':'Rest alert',
      'dashboard.notif.attention':'Attention alert',
      'dashboard.notif.reward':'Reward',
      'dashboard.reward.msg':'Congratulations! +10 XP',
      'notif.sound':'Sound',
      'notif.system':'System',
      'notif.clear':'Clear',
      'notif.mark':'Mark',
      'notif.none':'No notifications',

      'contact.title': 'Join our newsletter',
      'contact.desc': 'Get news, updates and tips to improve your digital wellbeing.',
      'contact.email.placeholder': 'Email',
      'contact.subscribe': 'Subscribe now',

      'footer.copy': 'Copyright(C) 2020',
      'footer.allrights': 'All rights reserved.',

      // login/register
      'login.welcome':'Welcome back',
      'login.sub':'Enter your credentials to access your account and continue where you left off.',
      'login.noaccount':'No account? Sign up here',
      'login.title':'Login',
      'login.email':'Email',
      'login.password':'Password',
      'login.remember':'Remember me',
      'login.btn':'Login',

      'register.hero.title':'Learn about yourself with this new AI — evolve as an individual',
      'register.hero.sub':'Mindful-AI is the AI everyone needs daily — a pocket psychologist.',
      'register.card.title':'Get started',
      'register.name':'First name',
      'register.lastname':'Last name',
      'register.email':'Email',
      'register.country':'Country',
      'register.phone':'Phone',
      'register.submit':'Start with Mindful-AI',

      'blog.title':'Blog',
      'blog.lead':'News, tips and resources about digital wellbeing and Mindful-AI.',
      'blog.readmore':'Read more',

      'faqs.title':'Frequently Asked Questions',
      'faqs.lead':'Here we answer the most common questions about Mindful-AI. If you don\'t find what you\'re looking for, contact us.',
      'faqs.q1.question':'1. What is Mindful AI?',
      'faqs.q1.answer':'Mindful AI is a web and mobile system that uses artificial intelligence to detect early signs of stress, anxiety and depression by analyzing users\' digital habits and behavior patterns.',
      'faqs.q2.question':'2. How does Mindful AI help users?',
      'faqs.q2.answer':'Mindful AI helps users by sending preventive alerts, offering personalized recommendations, and providing quick self-care options to support emotional wellbeing.',
      'faqs.q3.question':'3. Why is Mindful AI important?',
      'faqs.q3.answer':'Mindful AI is important because it promotes early detection of mental health issues, allowing users to act faster and improve their overall emotional health.',
      'faqs.q4.question':'4. How do interviews justify the need for an AI to manage breaks and digital habits?',
      'faqs.q4.answer':'Because most people use computers between 4 and 10 hours, many do not take breaks and several experience fatigue or difficulty disconnecting. Also, participants showed interest in an AI that organizes time and adapts to routines.',
      'faqs.q5.question':'5. What differentiates Mindful AI from competitors like RescueTime or ClickUp AI?',
      'faqs.q5.answer':'Mindful AI not only measures productivity but also detects stress, anxiety and depression, offers emotional recommendations and is adapted to the Peruvian context, unlike general time or task apps.',
      'faqs.q6.question':'6. How is it validated that the solution meets real needs?',
      'faqs.q6.answer':'Needfinding and interviews revealed needs such as personalization, breaks, emotional management and privacy. The User Stories integrate exactly those user demands.',
      'faqs.q7.question':'7. How do I use MindfulAI on my computer?',
      'faqs.q7.answer':'To have MindfulAI on your computer you first need to download it; once downloaded you must create an account. Finally, log in and you can use the application normally.',
      'faqs.q8.question':'8. Will the application have any micro-transactions for its use?',
      'faqs.q8.answer':'MindfulAI will not charge to download the app or generate schedules. If at any time a prompt to make a payment appears, please re-download the app from legitimate sources.',

      'about.title':'About',
      'about.lead':'MindfulAI is an AI focused on users\' mental wellbeing. Our mission is to promote emotional health through early detection and personalized recommendations.',
      'about.mission':'Our mission',
      'about.vision':'Our vision',
      'about.values':'Values',
      'about.values.1':'Privacy and security',
      'about.values.2':'Empathy and respect',
      'about.values.3':'Transparency',
      'about.values.4':'Responsible innovation'
    }
  };

  function applyTranslations(lang){
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = translations[lang] && translations[lang][key];
      if(!text) return;
      if(el.placeholder !== undefined && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')){
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
  }

  // Getter to use translations from other scripts
  window.getI18n = function(key){
    const lang = localStorage.getItem('site-lang') || 'es';
    if(translations[lang] && translations[lang][key]) return translations[lang][key];
    // fallback to spanish then key
    if(translations['es'] && translations['es'][key]) return translations['es'][key];
    return key;
  };

  function setLang(lang){
    localStorage.setItem('site-lang', lang);
    applyTranslations(lang);
    const sel = document.getElementById('lang-select');
    if(sel) sel.value = lang;
  }

  document.addEventListener('DOMContentLoaded', function(){
    const stored = localStorage.getItem('site-lang') || 'es';
    // ensure selector exists after header rendered
    const sel = document.getElementById('lang-select');
    if(sel){
      sel.addEventListener('change', function(){ setLang(this.value); });
    }
    applyTranslations(stored);
  });

  // --- Lightweight notification bell + panel initializer (works on all pages) ---
  function notifInit(){
    const NOTIF_KEY = 'mf_notifications_v1';
    function load(){ try{ const raw = localStorage.getItem(NOTIF_KEY); return raw? JSON.parse(raw):{items:[]}; }catch(e){return {items:[]};} }
    function unreadCount(){ const s = load(); return s.items.filter(n=>!n.read).length; }
    const bell = document.getElementById('notif-bell') || document.querySelector('.notif-bell');
    if(!bell) return;
    if(window.getI18n) bell.title = window.getI18n('dashboard.notifications');
    function updateBadge(){ const b = bell.querySelector('.notif-badge'); const u = unreadCount(); if(b) b.textContent = u>0? String(u):''; }
    updateBadge();
    // panel builder
    let panel = null;
    function buildPanel(){ if(panel) return panel; panel = document.createElement('div'); panel.className='notif-center'; panel.innerHTML = `<div class="notif-center__head"><strong>${window.getI18n ? window.getI18n('dashboard.notifications') : 'Notifications'}</strong><button class="notif-clear">${window.getI18n ? window.getI18n('notif.clear') : 'Clear'}</button></div><div class="notif-center__settings"><label><input type="checkbox" id="notif-sound"> ${window.getI18n ? window.getI18n('notif.sound') : 'Sound'}</label><label><input type="checkbox" id="notif-system"> ${window.getI18n ? window.getI18n('notif.system') : 'System'}</label></div><ul class="notif-list"></ul>`; document.body.appendChild(panel);
      panel.querySelector('.notif-clear').addEventListener('click', ()=>{ localStorage.setItem(NOTIF_KEY, JSON.stringify({items:[]})); render(); updateBadge(); });
      const sound = panel.querySelector('#notif-sound'); const system = panel.querySelector('#notif-system'); if(sound) sound.checked = localStorage.getItem('mf_notif_sound')==='1'; if(system) system.checked = localStorage.getItem('mf_notif_system')==='1';
      if(sound) sound.addEventListener('change', e=> localStorage.setItem('mf_notif_sound', e.target.checked?'1':'0'));
      if(system) system.addEventListener('change', e=> localStorage.setItem('mf_notif_system', e.target.checked?'1':'0'));
      return panel;
    }
    function render(){ const p = buildPanel(); const list = p.querySelector('.notif-list'); list.innerHTML=''; const s = load(); if(!s.items || s.items.length===0){ list.innerHTML = `<li class="notif-empty">${window.getI18n?window.getI18n('notif.none'):'No notifications'}</li>`; return; } s.items.slice().reverse().forEach(n=>{ const li = document.createElement('li'); li.className='notif-item '+(n.read?'read':'unread'); li.innerHTML = `<div class="notif-item__meta"><strong>${n.title}</strong><small>${new Date(n.ts).toLocaleString()}</small></div><div class="notif-item__body">${n.body}</div><div class="notif-item__actions"><button class="mark-read">${window.getI18n?window.getI18n('notif.mark'):'Mark'}</button></div>`; li.querySelector('.mark-read').addEventListener('click', ()=>{ n.read=true; const all = load(); const found = all.items.find(x=>x.id===n.id); if(found) found.read=true; localStorage.setItem(NOTIF_KEY, JSON.stringify(all)); render(); updateBadge(); }); list.appendChild(li); }); }
    bell.addEventListener('click', ()=>{ const p = buildPanel(); p.classList.toggle('open'); render(); });
    // Full addNotification: persistent store + toast + system notify + sound
    function addNotification(title, body, type='info', opts={sound:true, system:true}){
      const s = load(); s.items = s.items || [];
      const item = { id:'n_'+Date.now()+'_'+Math.floor(Math.random()*1000), title, body, type, ts:Date.now(), read:false };
      s.items.push(item);
      localStorage.setItem(NOTIF_KEY, JSON.stringify(s));
      updateBadge();
      render();
      // toast
      if(window.showToast) window.showToast(title + (body?(' — '+body):''), type==='warning'?'warning':(type==='success'?'success':'info'));
      // system
      const systemEnabled = localStorage.getItem('mf_notif_system') === '1' || opts.system;
      if(systemEnabled && 'Notification' in window){ if(Notification.permission === 'granted'){ new Notification(title,{ body }); } else if(Notification.permission !== 'denied'){ Notification.requestPermission().then(p=>{ if(p==='granted') new Notification(title,{body}); }); } }
      // sound
      const soundEnabled = localStorage.getItem('mf_notif_sound') === '1' || opts.sound;
      if(soundEnabled && window.playBeep) window.playBeep();
    }
    // expose
    window.mfNotify = addNotification;
  }
  document.addEventListener('DOMContentLoaded', notifInit);

  // expose for debugging
  window.setSiteLang = setLang;
})();
