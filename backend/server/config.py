class Config:
    # TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
    SECRET_KEY = 'f1ccc95877a2798853431de3d3446a53'
    FLASK_ENV = 'Development'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_DEBUG = True
    MAIL_SUPRESS_SEND = False
    TESTING = False
    MAIL_USERNAME = 'taskmaster3900@gmail.com'
    MAIL_PASSWORD = 'mosquito_mojito'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    UPLOAD_FOLDER = './server/images'
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}