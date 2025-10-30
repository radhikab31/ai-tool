import "./App.css";
import {useState} from "react";
import {URL} from "./constants";
import {Answers} from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem("history")));
  const payload = {
    contents: [
      {
        parts: [{text: question}],
      },
    ],
  };
  const askQuestion = async () => {
    console.log("Question asked:", question);
    const inputvalue = document.querySelector("input");
    inputvalue.value = "";
    if (localStorage.getItem("history")) {
      let oldHist = JSON.parse(localStorage.getItem("history"));
      oldHist = [question, ...oldHist];
      localStorage.setItem("history", JSON.stringify(oldHist));
      setRecentHistory(oldHist);
    } else {
      localStorage.setItem("history", JSON.stringify([question]));
      setRecentHistory([question]);
    }
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    let dataArray = dataString.split("* ");

    // Assign the new, trimmed array to a variable
    let trimmedData = dataArray.map((item) => item.trim());

    console.log("Response received:", result, trimmedData);
    setResult([...result, {type: "ques", text: question}, {type: "ans", text: trimmedData}]); // Set the new, trimmed array
  };

  const clearHistory = () => {
    localStorage.removeItem("history");
    setRecentHistory([]);
  };

  // console.log("Rendering history:", recentHistory);
  return (
    <div className="grid grid-cols-4 h-screen text-center text-xl">
      <div className="col-span-1 bg-zinc-800 text-white">
        <div className="flex gap-2 m-3 justify-center">
          <span className="font-bold">Recent History</span>
          <button onClick={clearHistory} className="bg-[url(./assets/deleteSymbol.png)] size-[30px] cursor-pointer hover:brightness-50"></button>
        </div>
        <div>
          <ul>
            {recentHistory &&
              recentHistory.map((historyItem, idx) => (
                <li key={idx + Math.random()} className="text-left truncate p-1 mx-1 cursor-pointer hover:bg-zinc-700">
                  {historyItem}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="col-span-3 bg-zinc-900">
        <div className="container h-150 m-2 overflow-scroll text-white">
          <div>Hello useer! </div>
          <div>
            <ul>
              {result &&
                result.map((res, idx) => (
                  <div key={idx + Math.random} className={res.type === "ques" ? "flex justify-end m-4" : "m-4"}>
                    {res.type === "ques" ? (
                      <li className="text-right bg-zinc-400 px-2 py-1 rounded-tl-2xl rounded-b-2xl w-fit font-bold" key={idx + Math.random()}>
                        <Answers answers={res.text} index={idx} totalResult={result.length} />
                      </li>
                    ) : (
                      res.text.map((ansText, ansidx) => (
                        <li className="text-left px-2 py-1 bg-zinc-500 my-3 rounded-tr-2xl rounded-b-2xl w-fit font-bold" key={ansidx + Math.random()}>
                          <Answers answers={ansText} index={ansidx} totalResult={result.length} />
                        </li>
                      ))
                    )}
                  </div>
                ))}
            </ul>
          </div>
        </div>
        <div className="bg-zinc-800 w-1/2 text-white m-auto rounded-4xl border-zinc-600 border-2 flex p-2 h-16">
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} className="w-full h-full p-3 outline-none" placeholder="Ask me anything..." />
          <button className="pr-2" onClick={() => askQuestion()}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
