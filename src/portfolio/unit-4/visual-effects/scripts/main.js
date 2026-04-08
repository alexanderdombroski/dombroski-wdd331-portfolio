import { questionMap, alma5 } from "./alma5.js";

const verses = alma5.verses;

let content = [];
let questionIndices = [];

function buildContent() {
  content = [];
  let questionIndex = 0;

  verses.forEach((verse) => {
    const verseNum = verse.verse;
    content.push({
      type: "verse",
      reference: verse.reference,
      text: verse.text,
      verse: verseNum,
    });

    const questionsForVerse = questionMap[verseNum];
    if (questionsForVerse) {
      const qArray = Array.isArray(questionsForVerse)
        ? questionsForVerse
        : [questionsForVerse];
      qArray.forEach((q) => {
        questionIndices.push(content.length);
        content.push({
          type: "question",
          ref: `Alma 5:${verseNum}`,
          text: q,
          questionIndex: questionIndex,
        });
        questionIndex++;
      });
    }
  });
}

let state = [];
const list = document.getElementById("questionsList");
const img = document.getElementById("christImg");
const overlay = document.getElementById("overlay");
const percentText = document.getElementById("percentText");
const progressText = document.getElementById("progressText");

function render() {
  list.innerHTML = "";

  content.forEach((item, i) => {
    const el = document.createElement("div");

    if (item.type === "verse") {
      el.className = "verse";
      el.innerHTML = `
        <p>${item.verse}. ${item.text}</p>
      `;
    } else {
      el.className = "question";
      const qIdx = item.questionIndex;
      if (state[qIdx]) {
        el.classList.add("checked");
      }
      el.innerHTML = `
        <span class="checkbox">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="hsl(35,30%,96%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>
          <span class="question-text">${item.text}</span>
          <span class="question-ref">${item.ref}</span>
        </span>`;
      el.addEventListener("click", () => {
        state[qIdx] = !state[qIdx];
        el.classList.toggle("checked", state[qIdx]);
        update();
      });
    }

    list.appendChild(el);
  });
}

function update() {
  const count = state.filter(Boolean).length;
  const totalQuestions = state.length;
  const progress = count / totalQuestions;
  const blur = (1 - progress) * 20;

  img.style.filter = `blur(${blur}px)`;
  img.style.transform = `scale(${1 + blur * 0.005})`;
  overlay.style.opacity = progress < 1 ? 1 - progress : 0;
  percentText.textContent = `${Math.round(progress * 100)}% Clear`;
  progressText.textContent =
    count === totalQuestions
      ? `${count} of ${totalQuestions} answered — His image is clear.`
      : `${count} of ${totalQuestions} answered — keep going.`;
}

buildContent();
state = new Array(questionIndices.length).fill(false);
render();
update();
