from flask import Flask, render_template, request, jsonify, redirect, url_for
import datetime
import os

app = Flask(__name__)

LOG_FILE = 'activity.log'

def log_activity(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, 'a') as f:
        f.write(f"[{timestamp}] {message}\n")

@app.route('/')
def login():
    # log_activity("Visit: Login Page")
    return render_template('login.html')

@app.route('/api/login', methods=['POST'])
def handle_login():
    username = request.form.get('username')
    if username:
        log_activity(f"User Login: {username}")
        # Redirect to quiz with username as a query parameter or just render directly
        # Rendering directly to keep it simple without sessions for now
        return render_template('quiz.html', username=username)
    return redirect(url_for('login'))

@app.route('/api/log_visit', methods=['POST'])
def log_visit():
    data = request.json
    username = data.get('username', 'Anonymous')
    log_activity(f"Quiz Start: {username} loaded the quiz.")
    return jsonify({"status": "success"})

@app.route('/api/log_score', methods=['POST'])
def log_score():
    data = request.json
    username = data.get('username', 'Anonymous')
    score = data.get('score', 0)
    total = data.get('total', 0)
    log_activity(f"Quiz Complete: {username} scored {score}/{total}")
    return jsonify({"status": "success"})

if __name__ == '__main__':
    # Create log file if it doesn't exist
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, 'w') as f:
            f.write("--- Activity Log Started ---\n")
            
    app.run(debug=True)
