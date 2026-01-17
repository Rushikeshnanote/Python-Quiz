from quiz import Quiz
import os

def main():
    # Define relative path to the JSON storage
    # Assuming question.json is in the same directory or properly referenced
    data_file = 'question.json'
    
    # Check if the file exists before starting
    if not os.path.exists(data_file):
        print(f"Error: Database file '{data_file}' not found in current directory.")
        return

    quiz_app = Quiz(data_file)
    quiz_app.run()

if __name__ == "__main__":
    main()
