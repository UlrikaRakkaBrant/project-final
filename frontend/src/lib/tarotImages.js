// frontend/src/lib/tarotImages.js

// Use Special:FilePath so we don't need hashed CDN paths
const WIKI = 'https://commons.wikimedia.org/wiki/Special:FilePath';

// Exact, stable filenames for the Major Arcana
const MAJOR_FILES = {
  'The Fool': 'RWS_Tarot_00_Fool.jpg',
  'The Magician': 'RWS_Tarot_01_Magician.jpg',
  'The High Priestess': 'RWS_Tarot_02_High_Priestess.jpg',
  'The Empress': 'RWS_Tarot_03_Empress.jpg',
  'The Emperor': 'RWS_Tarot_04_Emperor.jpg',
  'The Hierophant': 'RWS_Tarot_05_Hierophant.jpg',
  'The Lovers': 'RWS_Tarot_06_Lovers.jpg',
  'The Chariot': 'RWS_Tarot_07_Chariot.jpg',
  'Strength': 'RWS_Tarot_08_Strength.jpg',
  'The Hermit': 'RWS_Tarot_09_Hermit.jpg',
  'Wheel of Fortune': 'RWS_Tarot_10_Wheel_of_Fortune.jpg',
  'Justice': 'RWS_Tarot_11_Justice.jpg',
  'The Hanged Man': 'RWS_Tarot_12_Hanged_Man.jpg',
  'Death': 'RWS_Tarot_13_Death.jpg',
  'Temperance': 'RWS_Tarot_14_Temperance.jpg',
  'The Devil': 'RWS_Tarot_15_Devil.jpg',
  'The Tower': 'RWS_Tarot_16_Tower.jpg',
  'The Star': 'RWS_Tarot_17_Star.jpg',
  'The Moon': 'RWS_Tarot_18_Moon.jpg',
  'The Sun': 'RWS_Tarot_19_Sun.jpg',
  'Judgement': 'RWS_Tarot_20_Judgement.jpg',
  'The World': 'RWS_Tarot_21_World.jpg',
};

// Minor ranks → number used in filenames (Ace=01 … King=14)
const RANK_TO_NUM = {
  Ace: '01', Two: '02', Three: '03', Four: '04', Five: '05',
  Six: '06', Seven: '07', Eight: '08', Nine: '09', Ten: '10',
  Page: '11', Knight: '12', Queen: '13', King: '14',
};

// Build the filename pattern for minors: e.g. "Ace of Wands" → "Wands01.jpg"
function fileForMinor(name) {
  // Name usually looks like "Ace of Wands", "Three of Cups", etc.
  const m = /^([A-Za-z]+)\s+of\s+([A-Za-z]+)$/.exec(name);
  if (!m) return null;
  const rank = m[1];
  let suit = m[2];

  // Normalize common synonyms if needed
  if (suit.toLowerCase() === 'coins') suit = 'Pentacles';

  const num = RANK_TO_NUM[rank];
  if (!num) return null;
  return `${suit}${num}.jpg`; // e.g. "Swords04.jpg"
}

// card is one item from tarotapi.dev: { name, type, ... }
export function imageUrlForCard(card) {
  // Try majors map
  const mf = MAJOR_FILES[card.name];
  if (mf) return `${WIKI}/${encodeURIComponent(mf)}`;

  // Try minors
  const minor = fileForMinor(card.name);
  if (minor) return `${WIKI}/${encodeURIComponent(minor)}`;

  // Fallback image in /public
  return '/card-back.svg';
}
