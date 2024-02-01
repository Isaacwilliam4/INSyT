import OpenAI from 'openai';

import { createContext, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [htmlContent, setHtmlContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true,
  });

  const getCompletion = async () => {
    setIsLoading(true);
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

    console.log(completion);
    const content = completion.choices[0].message.content;
    parseOpenAIString(content);
    setResponse(content);
    setIsLoading(false);
  };

  const parseOpenAIString = (content) => {
    const lines = content.split('\n');
    const elements = [];

    lines.forEach((line, index) => {
      if (/^-+$/.test(line.trim())) {
        return; // Continue to the next iteration
      }
      if (line.trim().startsWith('-')) {
        // Bullet points
        elements.push(<li key={index}>{line.trim().substring(1).trim()}</li>);
      } else if (line.trim().length > 0) {
        // Headings and other text
        elements.push(
          <h1 className='mb-2 mt-4 text-xl font-bold' key={index}>
            {line.trim()}
          </h1>
        );
      }
    });

    setHtmlContent(elements);
  };

  const renderLineChart = (
    <LineChart
      width={600}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type='monotone' dataKey='uv' stroke='#8884d8' />
      <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  const SkeletonLoader = () => {
    return (
      <div className='2xl:mx-60 xl:mx-48 lg:mx-40 md:mx-32 mx-5 my-2'>
        <div className='animate-pulse'>
          <div className='h-8 bg-grey rounded-md'></div>
        </div>
        <div className='animate-pulse space-y-2'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-4 bg-grey rounded-md'></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {!isClicked ? (
        <div className='flex justify-center items-center'>
          <button className='btn-dark py-2 mx-2 my-4' onClick={getCompletion}>
            Generate a Network Intrusion Detection Report
          </button>
        </div>
      ) : isLoading ? (
        <div className='flex justify-center items-center'>
          <button className='btn-dark py-2 mx-2 my-4' onClick={getCompletion}>
            Generating A Report... It usually takes about 20-30 seconds
          </button>
        </div>
      ) : (
        <div
          className='transition flex justify-center items-center'
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <button className='btn-dark py-2 mx-2 my-4' onClick={getCompletion}>
            {isShown ? 'Regenerate a Report' : ''}
          </button>
        </div>
      )}
      {isLoading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        <>
          {response.length > 0 ? (
            <>
              <div className='flex flex-col justify-center items-center'>
                <h4 className='text-3xl font-bold mx-5 my-6'>
                  Network Detection Summary Report
                </h4>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <h4 className='text-2xl font-bold mx-5 my-6'>
                  Network Attack Counts for Each Hour
                </h4>
                {renderLineChart}
              </div>
            </>
          ) : (
            <></>
          )}
          <div className='2xl:mx-60 xl:mx-48 lg:mx-40 md:mx-32 mx-5 my-2'>
            <div>
              {htmlContent.map((react_element, index) => {
                return <div key={index}>{react_element}</div>;
              })}
            </div>
          </div>
          {isClicked ? (
            <div className='flex justify-center items-center my-10'>
              <button className='btn-dark py-2 mx-2 my-4' onClick={getCompletion}>
                Regenerate a Report
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
