from flask import Flask, render_template, request, jsonify

from rag_pipeline import ask

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chatbot")
def chatbot():
    # Rendered inside a separate popup window (see the "Launch" button
    # on the landing page, which opens this route via window.open()).
    return render_template("chatbot.html")


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    question = (data.get("question") or "").strip()

    if not question:
        return jsonify({"error": "Please enter a question."}), 400

    # The route only ever forwards to ask() and only ever returns what
    # ask() gives back — no other source of answer text is used.
    result = ask(question)

    if "error" in result:
        return jsonify({"error": result["error"]}), 500

    return jsonify({"answer": result["answer"]})


if __name__ == "__main__":
    app.run(debug=True)
