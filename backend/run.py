from server import app
import sys 

if __name__ == '__main__':
    app.run(port=int(sys.argv[1]))