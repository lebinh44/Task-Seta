function stringFrequent(arr) {
  if (arr.length === 0) return { result: [], maxFreq: 0 };

  const count = {};
  for (let s of arr) {
    let len = s.length;
    count[len] = (count[len] || 0) + 1;
  }

  let maxFreq = Math.max(...Object.values(count));

  const result = arr.filter((s) => count[s.length] === maxFreq);
  return `${JSON.stringify(result)}${maxFreq}`;
}

const testCases = [
  {
    input: ["a", "ab", "abc", "cd", "def", "gh"],
    expected: '["ab","cd","gh"]3',
  },
  {
    input: ["one", "two", "three", "six"],
    expected: '["one","two","six"]3',
  },
  {
    input: ["apple", "dog", "cat", "sun"],
    expected: '["dog","cat","sun"]3',
  },
];

function unitTest() {
  testCases.forEach((tc, i) => {
    const result = stringFrequent(tc.input);
    const pass = result === tc.expected;
    console.log(
      `Input: [${tc.input}] | Output: ${result} | ${pass ? "Pass" : "Fail"}`
    );
    if (!pass) {
      console.log("Expected:", tc.expected);
      console.log("Got: ", result);
    }
  });
}

unitTest();
