const quiz = [
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What is the first weapon you acquire in Half-Life?',
    correct_answer: 'A crowbar',
    incorrect_answers: [
      'A pistol',
      'The H.E.V suit',
      'Your fists',
    ],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'hard',
    question: 'What year was Queen Elizabeth II born?',
    correct_answer: '1926',
    incorrect_answers: [
      '1923',
      '1929',
      '1930',
    ],
  },
  {
    category: 'Mythology',
    type: 'boolean',
    difficulty: 'medium',
    question: 'According to Norse mythology, Loki is a mother.',
    correct_answer: 'True',
    incorrect_answers: [
      'False',
    ],
  },
  {
    category: 'Entertainment: Books',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the make and model of the tour vehicles in "Jurassic Park"; (1990)?',
    correct_answer: '1989 Toyota Land Cruiser',
    incorrect_answers: [
      '1989 Jeep Wrangler YJ Sahar',
      '1989 Ford Explorer XLT',
      'Mercedes M-Class',
    ],
  },
];

export default quiz;
