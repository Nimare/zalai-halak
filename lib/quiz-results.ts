import quizResults from '../data/quiz-results.json';
import type { Mode } from './game-rules';

export function getQuizResult(mode: Mode, score: number) {
  if (mode === 'beginner') {
    if (score <= 10) return quizResults['lapi-poc'];
    if (score <= 15) return quizResults['folyami-geb'];
    return quizResults.ponty;
  }
  if (score <= 4) return quizResults['lapi-poc'];
  if (score <= 8) return quizResults['folyami-geb'];
  if (score <= 12) return quizResults.ponty;
  if (score <= 16) return quizResults.suger;
  return quizResults.csuka;
}
