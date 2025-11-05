export default function SearchPanel({question, setQuestion, askQuestion}) {

     const keyPress = (event) => {
    if (event.key === "Enter") {
      askQuestion();
    }
  };
  return (
    <div className="dark:bg-zinc-800 bg-zinc-100 w-1/2 dark:text-white text-zinc-400 m-auto rounded-4xl border-zinc-600 border-2 flex p-2 align-bottom ">
      <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} onKeyUp={keyPress} className="w-full h-full p-3 outline-none" placeholder="Ask me anything..." />
      <button className="pr-2" onClick={() => askQuestion()}>
        Ask
      </button>
    </div>
  );
}
