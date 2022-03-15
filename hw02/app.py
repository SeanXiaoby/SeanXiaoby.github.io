from flask import Flask, render_template, request
import model

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        userAge = request.form['userAge']
        userWeight = request.form['userWeight']

        predictAnswer = str(model.load(userAge,userWeight))

        return render_template("BloodPredict.html", answer = predictAnswer, inputAge = userAge, inputWeight = userWeight)
    else:
        return render_template("BloodPredict.html")


if __name__ == '__main__':
    app.run(debug=True)
