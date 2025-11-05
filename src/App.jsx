import "./App.css";
import {useEffect, useRef, useState} from "react";
import {URL} from "./constants";
import RecentSearch from "./components/RecentSearch";
import Loader from "./components/Loader";
import SearchPanel from "./components/SeachPanel";
import Questions from "./components/Questions";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState("");
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem("history")));
  const scrolltoAns = useRef();
  const [loader, setLoader] = useState(false);

 

  const askQuestion = async () => {
    if (!question && !selectedHistory) return;
    console.log("Question asked:", question);

    if (question) {
      if (localStorage.getItem("history")) {
        let oldHist = JSON.parse(localStorage.getItem("history"));
        oldHist = [question, ...oldHist];
        localStorage.setItem("history", JSON.stringify(oldHist));
        setRecentHistory(oldHist);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payloadData = question ? question : selectedHistory;
    console.log(payloadData);
    const payload = {
      contents: [
        {
          parts: [{text: payloadData}],
        },
      ],
    };
    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    let dataArray = dataString.split("* ");
    let trimmedData = dataArray.map((item) => item.trim());
    console.log("Response received:", result, trimmedData);
    setResult([...result, {type: "ques", text: question ? question : selectedHistory}, {type: "ans", text: trimmedData}]); // Set the new, trimmed array
    setQuestion("");

    setTimeout(() => {
      scrolltoAns.current.scrollTop = scrolltoAns.current.scrollHeight;
      setLoader(false);
    }, 1000);
  };

  

  useEffect(() => {
    console.log("Selected history changed: ", selectedHistory);
    askQuestion();
  }, [selectedHistory]);

  const [darkMode, setDarkMode] = useState("dark");
  useEffect(()=>{
    console.log(darkMode)
    if(darkMode==="dark"){
      document.documentElement.classList.add("dark");
    }
    else{
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode])

  return (
    <div className="grid grid-cols-4 h-screen text-center text-xl overflow-hidden">
      <select className="fixed dark:text-white p-5 bottom-0 outline-none" onChange={(event) =>setDarkMode(event.target.value)}>
        <option value="dark">Dark Mode</option>
        <option value="light">Light Mode</option>
      </select>
      <RecentSearch recentHistory = {recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory = {setSelectedHistory}/>
      <div className="col-span-3 dark:bg-zinc-900 bg-amber-50 flex flex-col">
        <Loader loader={loader} />
        <div ref={scrolltoAns} className="container h-110 m-2 overflow-scroll align-middle text-white">
          <div>
            <Questions result={result} />
          </div>
        </div>
        <SearchPanel question={question} setQuestion={setQuestion} askQuestion={askQuestion} />
      </div>
    </div>
  );
}
export default App;
