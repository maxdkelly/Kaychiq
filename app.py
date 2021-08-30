from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__,static_folder='frontend/build',static_url_path='')
cors = CORS(app)

from api.general.routes import general
app.register_blueprint(general)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
	app.run()