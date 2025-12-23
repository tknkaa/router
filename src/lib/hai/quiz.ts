import { isAgariFromRaw } from "./agari";

function generateTehai(): number[] {
  const tehai: number[] = [];
  for (let i = 0; i < 13; i++) {
    tehai.push(Math.floor(Math.random() * 9) + 1);
  }
  tehai.sort();
  return tehai;
}

function findAnswer(hand: number[]): number[] {
  const answers: number[] = [];
  for (let i = 1; i < 10; i++) {
    const handWithAgariHai = [...hand, i];
    handWithAgariHai.sort();
    if (isAgariFromRaw(handWithAgariHai)) {
      answers.push(i);
    }
  }
  return answers;
}

type Quiz = {
  tehai: number[];
  answers: number[];
};

export function generateQuiz(): Quiz | null {
  const isComplete = false;
  let count = 0;
  while (!isComplete && count <= 10) {
    const tehai = generateTehai();
    const answers = findAnswer(tehai);
    if (answers.length > 0) {
      return {
        tehai,
        answers,
      };
    }
    count++;
  }
  return null;
}
