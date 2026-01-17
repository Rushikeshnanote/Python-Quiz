const questions = [
  // EASY LEVEL
  {
    "id": 1,
    "question": "What is the output of print(2 + 2)?",
    "options": ["3", "4", "5", "22"],
    "answer": "4",
    "difficulty": "easy"
  },
  {
    "id": 2,
    "question": "Which keyword is used to define a function in Python?",
    "options": ["func", "def", "define", "function"],
    "answer": "def",
    "difficulty": "easy"
  },
  {
    "id": 3,
    "question": "How do you insert comments in Python code?",
    "options": ["//", "/*", "#", "--"],
    "answer": "#",
    "difficulty": "easy"
  },
  {
    "id": 4,
    "question": "What is the correct file extension for Python files?",
    "options": [".pt", ".pyth", ".py", ".p"],
    "answer": ".py",
    "difficulty": "easy"
  },
  {
    "id": 5,
    "question": "How do you create a variable with the floating number 2.8?",
    "options": ["x = 2.8", "x: 2.8", "int x = 2.8", "float x = 2.8"],
    "answer": "x = 2.8",
    "difficulty": "easy"
  },
  {
    "id": 6,
    "question": "Which operator is used for multiplication?",
    "options": ["x", "*", "#", "%"],
    "answer": "*",
    "difficulty": "easy"
  },
  {
    "id": 7,
    "question": "What is the result of 10 // 3?",
    "options": ["3.33", "3", "3.0", "1"],
    "answer": "3",
    "difficulty": "easy"
  },
  {
    "id": 8,
    "question": "Which function outputs text to the console?",
    "options": ["echo()", "write()", "print()", "log()"],
    "answer": "print()",
    "difficulty": "easy"
  },
  {
    "id": 9,
    "question": "Which of these is a valid boolean value in Python?",
    "options": ["true", "True", "TRUE", "yes"],
    "answer": "True",
    "difficulty": "easy"
  },
  {
    "id": 10,
    "question": "How do you start a while loop?",
    "options": ["while x > y:", "while (x > y)", "while x > y {", "x > y while"],
    "answer": "while x > y:",
    "difficulty": "easy"
  },

  // MEDIUM LEVEL
  {
    "id": 11,
    "question": "What data type is the object below?<br><code>L = [1, 23, 'hello', 1]</code>",
    "options": ["List", "Dictionary", "Tuple", "Array"],
    "answer": "List",
    "difficulty": "medium"
  },
  {
    "id": 12,
    "question": "Which method removes whitespace from the beginning and end of a string?",
    "options": ["strip()", "trim()", "len()", "replace()"],
    "answer": "strip()",
    "difficulty": "medium"
  },
  {
    "id": 13,
    "question": "What does the range(5) function return?",
    "options": ["1,2,3,4,5", "0,1,2,3,4,5", "0,1,2,3,4", "1,2,3,4"],
    "answer": "0,1,2,3,4",
    "difficulty": "medium"
  },
  {
    "id": 14,
    "question": "Which collection is ordered, changeable, and allows duplicate members?",
    "options": ["Set", "Dictionary", "Tuple", "List"],
    "answer": "List",
    "difficulty": "medium"
  },
  {
    "id": 15,
    "question": "How can you return the length of a list?",
    "options": ["length(list)", "list.size()", "len(list)", "count(list)"],
    "answer": "len(list)",
    "difficulty": "medium"
  },
  {
    "id": 16,
    "question": "What is the correct syntax to import a module named 'math'?",
    "options": ["import math", "include math", "using math", "from math import *"],
    "answer": "import math",
    "difficulty": "medium"
  },
  {
    "id": 17,
    "question": "Which operator is used for exponentiation (power)?",
    "options": ["^", "**", "exp", "pow"],
    "answer": "**",
    "difficulty": "medium"
  },
  {
    "id": 18,
    "question": "Which of these is NOT a core data type?",
    "options": ["List", "Dictionary", "Class", "Tuple"],
    "answer": "Class",
    "difficulty": "medium"
  },
  {
    "id": 19,
    "question": "What is the output of bool(0)?",
    "options": ["True", "False", "Error", "None"],
    "answer": "False",
    "difficulty": "medium"
  },
  {
    "id": 20,
    "question": "How do you access the first element of a list named 'myList'?",
    "options": ["myList[1]", "myList(0)", "myList[0]", "myList.first()"],
    "answer": "myList[0]",
    "difficulty": "medium"
  },

  // HARD LEVEL
  {
    "id": 21,
    "question": "What is the output of: <code>print(type(lambda:None))</code>",
    "options": ["<class 'function'>", "<class 'lambda'>", "<class 'NoneType'>", "<class 'tuple'>"],
    "answer": "<class 'function'>",
    "difficulty": "hard"
  },
  {
    "id": 22,
    "question": "Which of these is mutable?",
    "options": ["Tuple", "String", "List", "Integer"],
    "answer": "List",
    "difficulty": "hard"
  },
  {
    "id": 23,
    "question": "What is the output of <code>print(2 * 3 ** 3)</code>?",
    "options": ["216", "54", "18", "729"],
    "answer": "54",
    "difficulty": "hard"
  },
  {
    "id": 24,
    "question": "What does <code>__init__</code> represent in a Python class?",
    "options": ["A static method", "The constructor", "A destructor", "A private method"],
    "answer": "The constructor",
    "difficulty": "hard"
  },
  {
    "id": 25,
    "question": "What is the result of <code>set([1, 2, 2, 3])</code>?",
    "options": ["{1, 2, 2, 3}", "[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)"],
    "answer": "{1, 2, 3}",
    "difficulty": "hard"
  },
  {
    "id": 26,
    "question": "Which statement matches a pattern in Python 3.10+?",
    "options": ["switch", "match", "case", "select"],
    "answer": "match",
    "difficulty": "hard"
  },
  {
    "id": 27,
    "question": "What produces a generator?",
    "options": ["yield", "return", "break", "continue"],
    "answer": "yield",
    "difficulty": "hard"
  },
  {
    "id": 28,
    "question": "Which is a valid decorator syntax?",
    "options": ["@decorator", "#decorator", "$decorator", "%decorator"],
    "answer": "@decorator",
    "difficulty": "hard"
  },
  {
    "id": 29,
    "question": "What is the MRO in Python?",
    "options": ["Method Resolution Order", "Main Runtime Object", "Memory Read Operation", "Method Return Object"],
    "answer": "Method Resolution Order",
    "difficulty": "hard"
  },
  {
    "id": 30,
    "question": "What is the output of <code>print(0.1 + 0.2 == 0.3)</code>?",
    "options": ["True", "False", "Error", "None"],
    "answer": "False",
    "difficulty": "hard"
  }
];
