// Answers.jsx

import {useEffect, useState} from "react";
import {checkHeading, replaceHeading} from "../helper";
export function Answers({answers, index, totalResult}) {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(answers);

  useEffect(() => {
    if(checkHeading(answers)){
        setHeading(true);
        setAnswer(replaceHeading(answers));
    }
  }, [answers]);

  return (<>
  {
    index ===0 && totalResult>1? <span className="pt-2 text-l font-bold">{answer}</span> :
  heading? <span className=" block text-lg">{answer}</span> : <span>{answers}</span>}</>);
}
