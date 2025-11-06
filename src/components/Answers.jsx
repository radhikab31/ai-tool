// Answers.jsx

import {useEffect, useState} from "react";
import {checkHeading, replaceHeading} from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light";
import {dark} from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
export default function Answers({answers, index, totalResult}) {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(answers);

  useEffect(() => {
    if(checkHeading(answers)){
        setHeading(true);
        setAnswer(replaceHeading(answers));
    }
  }, [answers]);

  const rendered = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
        {...props}
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        style={dark}
        preTag="div"
        />)
       : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  }

  return (<>
  {
    index ===0 && totalResult>1? <span className="pt-2 text-l font-bold">{answer}</span> :
  heading? <span className=" block text-lg">{answer}</span> : <span>
  <ReactMarkdown components = {rendered}>{answer}</ReactMarkdown>
  </span>}</>);
}
