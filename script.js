let mode = null; // "wake" o "sleep"

function setMode(selected) {
  mode = selected;
  const question = document.getElementById("question");
  const input = document.getElementById("timeInput");
  const btn = document.getElementById("calcBtn");

  input.style.display = "inline-block";
  btn.style.display = "inline-block";

  if (mode === "wake") {
    question.innerText = "¿A qué hora quieres despertarte?";
  } else {
    question.innerText = "¿A qué hora quieres acostarte?";
  }
}

function calculate() {
  const time = document.getElementById("timeInput").value;
  if (!time || !mode) return;

  let [hours, minutes] = time.split(":").map(Number);
  let results = [];

  if (mode === "wake") {
    // calcular a qué hora acostarse (restando ciclos de 90 min)
    for (let i = 1; i <= 6; i++) {
      minutes -= 90;
      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (hours < 0) hours += 24;

      results.push(formatTime(hours, minutes));
    }

    showResults("Debes acostarte a alguna de estas horas:", results.reverse());
  } else {
    // calcular a qué hora despertarse (sumando ciclos de 90 min)
    for (let i = 1; i <= 6; i++) {
      minutes += 90;
      if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
      }
      if (hours >= 24) hours -= 24;

      results.push(formatTime(hours, minutes));
    }

    showResults("Debes despertarte a alguna de estas horas:", results);
  }
}

function formatTime(h, m) {
  return ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2);
}

function showResults(message, times) {
  document.getElementById("results").innerHTML = 
    `<b>${message}</b><br>` + times.join("<br>");
}
