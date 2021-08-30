from flask import jsonify, Blueprint, request


general = Blueprint('gemeral', __name__)



@general.route("/api/test", methods=['POST','GET'])
def test():

    return jsonify({
        "isValid":True,
        "validMsg":"Test route works"
    })
