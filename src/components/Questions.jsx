import Answers from "./Answers.jsx";

export default function Questions({result}) {
  return (
    <ul>
      {result &&
        result.map((res, idx) => (
          <div key={idx + Math.random} className={res.type === "ques" ? "flex justify-end m-4" : "m-4"}>
            {res.type === "ques" ? (
              <li className="text-right dark:bg-zinc-400 bg-amber-600 px-2 py-1 rounded-tl-2xl rounded-b-2xl w-fit font-bold" key={idx + Math.random()}>
                <Answers answers={res.text} index={idx} totalResult={result.length} />
              </li>
            ) : (
              res.text.map((ansText, ansidx) => (
                <li className="text-left px-2 py-1 dark:bg-zinc-500 bg-amber-500 my-3 rounded-tr-2xl rounded-b-2xl w-fit font-bold" key={ansidx + Math.random()}>
                  <Answers answers={ansText} index={ansidx} totalResult={result.length} />
                </li>
              ))
            )}
          </div>
        ))}
    </ul>
  );
}
