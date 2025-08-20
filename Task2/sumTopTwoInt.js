function sumTopTwoInt(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw new Error("Input must be an array of at least two integers!");
  }
  let max1 = -Infinity;
  let max2 = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max1) {
      max2 = max1;
      max1 = arr[i];
    } else if (arr[i] > max2) {
      max2 = arr[i];
    }
  }
  return max1 + max2;
}

function unitTest() {
  const testCases = [
    { input: [1, 4, 2, 3, 5], expected: 9 },
    { input: [3, 6, 3, 6], expected: 12 },
  ];

  for (const { input, expected } of testCases) {
    const result = sumTopTwoInt(input);
    const ok = result === expected;
    console.log(
      `input: ${JSON.stringify(input)} | output: ${result} | ${
        ok ? "Pass" : "Fail"
      }`
    );
  }
}

unitTest();
