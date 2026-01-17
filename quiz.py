import json
import random

class Quiz:
    def __init__(self, data_file):
        self.data_file = data_file
        self.questions = []
        self.score = 0
        self.load_questions()

    def load_questions(self):
        try:
            with open(self.data_file, 'r') as f:
                self.questions = json.load(f)
        except FileNotFoundError:
            print(f"Error: File '{self.data_file}' not found.")
            self.questions = []
        except json.JSONDecodeError:
            print(f"Error: Failed to decode JSON from '{self.data_file}'.")
            self.questions = []

    def run(self):
        if not self.questions:
            print("No questions loaded. Exiting.")
            return

        # Randomize question order (optional, but good for replayability)
        random.shuffle(self.questions)

        print("Welcome to the Python MCQ Quiz!")
        print("-------------------------------\n")

        for idx, q_data in enumerate(self.questions, 1):
            print(f"Question {idx}: {q_data['question']}")
            
            options = q_data['options']
            for i, option in enumerate(options, 1):
                print(f"  {i}. {option}")
            
            user_choice = self.get_user_input(len(options))
            
            correct_answer = q_data['answer']
            
            # Check if user input matches correct answer (by value or index depending on how we want to validate)
            # In our data, "answer" is the string value. 
            # We map user choice (index) back to the option string.
            user_answer_str = options[user_choice - 1]
            
            if user_answer_str == correct_answer:
                print("Correct!\n")
                self.score += 1
            else:
                print(f"Wrong! The correct answer was: {correct_answer}\n")

        self.show_results()

    def get_user_input(self, num_options):
        while True:
            try:
                choice = int(input("Enter your choice (number): "))
                if 1 <= choice <= num_options:
                    return choice
                else:
                    print(f"Please enter a number between 1 and {num_options}.")
            except ValueError:
                print("Invalid input. Please enter a number.")

    def show_results(self):
        print("-------------------------------")
        print(f"Quiz Completed!")
        print(f"Your Score: {self.score}/{len(self.questions)}")
        percentage = (self.score / len(self.questions)) * 100
        print(f"Percentage: {percentage:.2f}%")
