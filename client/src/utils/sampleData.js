export const sampleTests = [
  {
    _id: "1",
    title: "Reading Test 1: Climate Change",
    timeLimit: 20, // minutes
    passage: `Climate change is one of the most pressing issues facing our planet today. The Earth's average temperature has increased by about 1°C since pre-industrial times, primarily due to human activities. The burning of fossil fuels, deforestation, and industrial processes have led to increased greenhouse gas emissions, particularly carbon dioxide.

Scientists have observed various effects of this warming, including melting ice caps, rising sea levels, and more frequent extreme weather events. The Arctic is warming twice as fast as the global average, and sea levels have risen by about 8 inches since 1900.

Many countries have pledged to reduce their carbon emissions through international agreements like the Paris Accord. However, some experts argue that current commitments are insufficient to prevent dangerous levels of warming. Renewable energy sources, such as solar and wind power, are becoming increasingly important in the transition away from fossil fuels.`,
    questions: [
      {
        _id: "q1",
        questionText: "The Earth's temperature has risen by 2°C since pre-industrial times.",
        correctAnswer: "false",
        explanation: "The passage states that the temperature has increased by about 1°C, not 2°C."
      },
      {
        _id: "q2",
        questionText: "The Arctic is warming at double the global average rate.",
        correctAnswer: "true",
        explanation: "The passage explicitly states that the Arctic is warming twice as fast as the global average."
      },
      {
        _id: "q3",
        questionText: "Sea levels have increased by 12 inches since 1900.",
        correctAnswer: "false",
        explanation: "The passage mentions that sea levels have risen by about 8 inches, not 12 inches."
      },
      {
        _id: "q4",
        questionText: "The Paris Accord requires countries to eliminate all carbon emissions by 2030.",
        correctAnswer: "not given",
        explanation: "The passage mentions the Paris Accord but does not specify this requirement."
      },
      {
        _id: "q5",
        questionText: "Human activities are the main cause of global warming.",
        correctAnswer: "true",
        explanation: "The passage states that the temperature increase is primarily due to human activities."
      }
    ]
  },
  {
    _id: "2",
    title: "Reading Test 2: Ocean Pollution",
    timeLimit: 15,
    passage: `Ocean pollution has become a major environmental concern in recent decades. Every year, millions of tons of plastic waste enter the oceans, forming large garbage patches in various parts of the world. The largest of these, the Great Pacific Garbage Patch, is estimated to cover an area three times the size of France.

Marine animals often mistake plastic debris for food, leading to injury or death. Microplastics, which are tiny plastic particles less than 5mm in size, have been found in marine organisms from plankton to whales. These particles can accumulate toxins and move up the food chain, potentially affecting human health.

Recent studies have shown that plastic pollution reaches even the deepest parts of the ocean. Scientists have discovered plastic bags and candy wrappers at the bottom of the Mariana Trench, the deepest known point on Earth. Some researchers estimate that by 2050, there could be more plastic than fish in the oceans by weight.`,
    questions: [
      {
        _id: "q6",
        questionText: "The Great Pacific Garbage Patch is larger than France.",
        correctAnswer: "true",
        explanation: "The passage states it covers an area three times the size of France."
      },
      {
        _id: "q7",
        questionText: "All marine animals are affected by microplastics.",
        correctAnswer: "not given",
        explanation: "The passage mentions that microplastics are found in many marine organisms but doesn't state that all are affected."
      },
      {
        _id: "q8",
        questionText: "Plastic pollution only affects surface waters.",
        correctAnswer: "false",
        explanation: "The passage mentions that plastic pollution reaches the deepest parts of the ocean."
      },
      {
        _id: "q9",
        questionText: "Scientists have found plastic in the Mariana Trench.",
        correctAnswer: "true",
        explanation: "The passage explicitly states that plastic bags and candy wrappers were found in the Mariana Trench."
      },
      {
        _id: "q10",
        questionText: "The amount of plastic in the oceans doubles every year.",
        correctAnswer: "not given",
        explanation: "The passage does not mention the rate at which plastic accumulates in the oceans."
      }
    ]
  }
];
