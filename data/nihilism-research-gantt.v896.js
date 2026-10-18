/* Granskning 5, V8.96 – forskningshändelser i den gemensamma grafiska tidslinjen.
   Samma publikationer som H070–H075; ingen ny källa eller C6-status tillkommer. */
(function(){'use strict';
const questions=window.TIDENS_BIG_QUESTIONS_TIMELINE;
if(!questions||!Array.isArray(questions.events))return;
const additional=[
  {
    "id": "IQN001",
    "year": 1799,
    "topics": [
      "nihilism"
    ],
    "lane": "philosophy",
    "title": "1799 – Jacobi introducerar nihilismen i idealismdebatten",
    "detail": "I sitt öppna brev 1799 använder Friedrich Heinrich Jacobi nihilism som filosofisk anklagelse mot Fichtes idealism. Begreppets innebörd skiljer sig från senare rysk och existentialistisk nihilism. Tiden avser dokumenterad publikation, inte ett belagt startår för själva idéerna.",
    "certainty": "Utgivningsår belagt; enskild religionshistorisk fördjupning under bearbetning, inte C6-slutgranskad.",
    "source": "https://plato.stanford.edu/entries/friedrich-jacobi/",
    "precision": "exact",
    "relatedPostId": "H070"
  },
  {
    "id": "IQN002",
    "year": 1849,
    "topics": [
      "nihilism"
    ],
    "lane": "philosophy",
    "title": "1849 – Kierkegaard och förtvivlans problem",
    "detail": "Søren Kierkegaard analyserar jaget, förtvivlan och relationen till Gud i Sjukdomen till döds (1849). Ett kristet-existentiellt svar på meningskrisen, inte ett nihilistiskt manifest. Tiden avser dokumenterad publikation, inte ett belagt startår för själva idéerna.",
    "certainty": "Utgivningsår belagt; enskild religionshistorisk fördjupning under bearbetning, inte C6-slutgranskad.",
    "source": "https://plato.stanford.edu/entries/kierkegaard/",
    "precision": "exact",
    "relatedPostId": "H071"
  },
  {
    "id": "IQN003",
    "year": 1862,
    "topics": [
      "nihilism"
    ],
    "lane": "culture",
    "title": "1862 – Turgenjevs Fäder och söner populariserar ”nihilisten”",
    "detail": "Ivan Turgenjevs roman Fäder och söner skildrar Bazarov som nihilist. I 1860-talets Ryssland gäller termen opposition mot auktoriteter och sociala traditioner, inte en enda filosofi om livets mening. Tiden avser dokumenterad publikation, inte ett belagt startår för själva idéerna.",
    "certainty": "Utgivningsår belagt; enskild religionshistorisk fördjupning under bearbetning, inte C6-slutgranskad.",
    "source": "https://www.encyclopedia.com/arts/educational-magazines/fathers-and-sons",
    "precision": "exact",
    "relatedPostId": "H072"
  },
  {
    "id": "IQN004",
    "year": 1882,
    "topics": [
      "nihilism"
    ],
    "lane": "philosophy",
    "title": "1882 – Nietzsche: ”Gud är död” i Den glada vetenskapen",
    "detail": "Friedrich Nietzsche publicerar Den glada vetenskapen 1882. Formuleringen ”Gud är död” behandlar förlusten av kristendomens självklarhet som kulturell och moralisk grund, inte en bokstavlig guds död. Tiden avser dokumenterad publikation, inte ett belagt startår för själva idéerna.",
    "certainty": "Utgivningsår belagt; enskild religionshistorisk fördjupning under bearbetning, inte C6-slutgranskad.",
    "source": "https://plato.stanford.edu/entries/nietzsche/",
    "precision": "exact",
    "relatedPostId": "H073"
  },
  {
    "id": "IQN005",
    "year": 1887,
    "topics": [
      "nihilism"
    ],
    "lane": "philosophy",
    "title": "1887 – Nietzsche undersöker moralens ursprung",
    "detail": "Till moralens genealogi (1887) granskar historiska och psykologiska förklaringar till europeiska moralvärden. Nietzsche vill analysera och omvärdera värden; det är inte samma sak som att säga att allt saknar värde. Tiden avser dokumenterad publikation, inte ett belagt startår för själva idéerna.",
    "certainty": "Utgivningsår belagt; enskild religionshistorisk fördjupning under bearbetning, inte C6-slutgranskad.",
    "source": "https://plato.stanford.edu/entries/nietzsche/",
    "precision": "exact",
    "relatedPostId": "H074"
  },
  {
    "id": "IQN006",
    "year": 1942,
    "topics": [
      "nihilism"
    ],
    "lane": "philosophy",
    "title": "1942 – Camus och den absurda tillvaron",
    "detail": "Albert Camus publicerar Myten om Sisyfos (1942). Han beskriver kollisionen mellan människans behov av mening och världens tystnad och söker ett sätt att leva utan färdiga metafysiska svar. Tiden avser dokumenterad publikation, inte ett belagt startår för själva idéerna.",
    "certainty": "Utgivningsår belagt; enskild religionshistorisk fördjupning under bearbetning, inte C6-slutgranskad.",
    "source": "https://plato.stanford.edu/entries/camus/",
    "precision": "exact",
    "relatedPostId": "H075"
  }
];
for(const e of additional)if(!questions.events.some(x=>x.id===e.id))questions.events.push(e);
})();
