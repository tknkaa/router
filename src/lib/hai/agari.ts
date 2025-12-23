// refer to https://qiita.com/tomohxx/items/20d886d1991ab89f5522
function canDecomposeHand(hand: number[]): boolean {
  let a = hand[0];
  let b = hand[1];

  for (let i = 0; i < 7; i++) {
    const r = a % 3;
    if (b >= r && hand[i + 2] >= r) {
      a = b - 2;
      b = hand[i + 2] - r;
    } else {
      return false;
    }
  }
  if (a % 3 === 0 && b % 3 === 0) {
    return true;
  } else {
    return false;
  }
}

function isAgariFromEncoded(hand: number[]): boolean {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += i * hand[i];
  }
  for (
    let headCandidate = (sum * 2) % 3;
    headCandidate < 9;
    headCandidate += 3
  ) {
    hand[headCandidate] -= 2;
    if (hand[headCandidate] >= 0) {
      if (canDecomposeHand(hand)) {
        hand[headCandidate] += 2;
        return true;
      }
    }
    hand[headCandidate] += 2;
  }
  return false;
}

function runLengthEncode(rawHand: number[]): number[] {
  const encodedHand: number[] = [];
  for (const hai of rawHand) {
    encodedHand[hai - 1]++;
  }
  return encodedHand;
}

function runLengthDecode(hand: number[]): number[] {
  const decodedHand: number[] = [];
  for (let hai = 0; hai < hand.length; hai++) {
    const count = hand[hai];
    for (let j = 0; j < count; j++) {
      decodedHand[hai]++;
    }
  }
  return decodedHand;
}
export function isAgariFromRaw(rawhand: number[]): boolean {
  const encoded = runLengthEncode(rawhand);
  return isAgariFromEncoded(encoded);
}
