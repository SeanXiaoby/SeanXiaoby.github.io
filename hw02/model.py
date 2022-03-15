import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import os

def train():
    df = pd.read_csv("SBP.csv")

    x = df[["Age", "Weight"]]
    y = df["SBP"]

    regr = LinearRegression()
    regr.fit(x, y)

    joblib.dump(regr, "regr.pkl")


def load(strAge, strWeight):
    if not os.path.exists("regr.pkl"):
        train()
    clf = joblib.load("regr.pkl")
    age = int(strAge)
    weight = int(strWeight)
    x = pd.DataFrame([[age, weight]], columns=["Age", "Weight"])
    prediction = clf.predict(x)[0]
    # print(prediction)
    return prediction

if __name__ == "__main__":
    train()
    load("18","80")
