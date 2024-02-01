import OpenAI from 'openai';

import { createContext, useEffect, useState } from 'react';

// const openai = new OpenAI(import.meta.env.REACT_APP_OPENAI_API_KEY);

export default function Home() {
  const openai = new OpenAI({
    apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true,
  });
  const [response, setResponse] = useState([]);
  const [htmlContent, setHtmlContent] = useState([]);
  const getCompletion = async () => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Please generate a simple report on supply chain in 500 characters with bullet points. You should also make \n sign as a new line.',
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    console.log(completion);

    const content = completion.choices[0].message.content;
    
    setResponse(completion.choices[0].message.content);
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '\n') {
        htmlContent.push(<br />);
      }
      if (content[i] === '*') {
        htmlContent.push(<li />);
      }
      if (content[i] === '-') {
        htmlContent.push(<li />);
      } else {
        htmlContent.push(content[i]);
      }
    }
    setHtmlContent(htmlContent);
    console.log(htmlContent);
  };

  return (
    <div>
      <button className='btn-dark py-2 mx-2 my-2' onClick={getCompletion}>
        Get #scangun-fulfillment-issues Channel Report
      </button>
      <h1>{response.length > 0 ? <div>{htmlContent}</div> : <div></div>}</h1>
    </div>
  );
}