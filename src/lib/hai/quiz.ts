import { isAgariFromRaw } from "./agari";

//TODO: check the number of the same tile is less than or equal to 4.
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
  for (let i = 1; i <= 9; i++) {
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
  let maxAttempts = 10;
  for (let count = 0; count < maxAttempts; count++) {
    const tehai = generateTehai();
    console.log("tehai: ", count, tehai);
    const answers = findAnswer(tehai);
    console.log("answers: ", count, answers);
    if (answers.length > 0) {
      return {
        tehai,
        answers,
      };
    }
  }
  return null;
}


generateQuiz()