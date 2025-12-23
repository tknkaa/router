// use algorithm suggested in https://qiita.com/tomohxx/items/20d886d1991ab89f5522
// hand[i] is the number of i
// hand[0] = 0
function canDecomposeHand(hand: number[]): boolean {
  let a = hand[1];
  let b = hand[2];

  for (let i = 1; i <= 7; i++) {
    const r = a % 3;
    if (b >= r && hand[i + 2] >= r) {
      a = b - r;
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

//TODO: チートイツ, 九蓮宝燈
function isAgariFromEncoded(hand: number[]): boolean {
  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += i * hand[i];
  }
  for (
    let headCandidate = (sum * 2) % 3;
    headCandidate <= 9;
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

function encode(rawHand: number[]): number[] {
  const encodedHand: number[] = Array(10).fill(0);
  for (const hai of rawHand) {
    encodedHand[hai]++;
  }
  return encodedHand;
}

export function isAgariFromRaw(rawhand: number[]): boolean {
  const encoded = encode(rawhand);
  return isAgariFromEncoded(encoded);
}
