from flask import Flask

app = Flask(__name__)

from api.general.routes import general
app.register_blueprint(general)

# @app.route("/"):
# 	def index():
# 		return ""

if __name__ == "__main__":
	app.run()