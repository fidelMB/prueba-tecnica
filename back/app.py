from flask import Flask
from routes import contacts_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(contacts_bp)

@app.route('/')
def index():
    return 'Hello World!'

if __name__ == "__main__":
    app.run(debug=True)