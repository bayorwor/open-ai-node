import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { ScaleLoader, BarLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";

type contentPros = {
  title?: string;
  message?: string;
};

export default function Home() {
  const [generatedContent, setGeneratedContent] = useState<contentPros[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const description = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
      max_tokens: 100,
    });

    setGeneratedContent([
      ...generatedContent,
      {
        title: question,
        message: description.data.choices[0].message?.content,
      },
    ]);

    setQuestion("");
    setLoading(false);
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white mr-auto text-3xl w-auto p-4 block lg:hidden"
      >
        <i className="ri-menu-2-line"></i>
        {""}
      </button>

      <aside
        className={`w-full lg:w-60 bg-slate-600 ${
          isOpen ? "block transition-all ease-out duration-500" : "hidden"
        } lg:block`}
      >
        <nav>
          <h1 className="text-white text-center py-4">History</h1>
          {generatedContent?.map((content: contentPros, i: number) => (
            <div key={i} className="rounded-md shadow-lg m-2 bg-[#1E293B]">
              <h2 className="w-full border-b-2 bg-[#293548] text-slate-400 truncate p-2 rounded-md border-l-4 border-gray-600">
                {i + 1}. {content?.title}
              </h2>
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex-1" onClick={() => setIsOpen(false)}>
        <section className="h-screen w-full relative">
          {/* <h1 className="text-3xl text-center py-3 text-teal-300">

          </h1> */}
          <section className="mx-2 lg:mx-6 lg:mt-10 mb-10 h-[85vh] overflow-auto py-4 lg:px-40 hide-scroll-bar">
            {generatedContent?.map((content: contentPros, i: number) => (
              <div key={i} className="rounded-md shadow-lg m-4 bg-[#1E293B]">
                <h2 className="w-full border-b-2 bg-[#293548] text-slate-400 p-2 rounded-md border-l-4 border-gray-600">
                  {content?.title}
                </h2>
                <p className="p-4 border-l-4 border-green-600 text-white">
                  {/* @ts-ignore */}
                  <ReactMarkdown>{content?.message}</ReactMarkdown>{" "}
                </p>
              </div>
            ))}
            {generatedContent?.length <= 0 && (
              <div className="rounded-md shadow-lg m-4 bg-[#1E293B]">
                <p className="p-4 border-l-4 border-blue-500 text-white">
                  I'm your assistant, how can I help you?
                </p>
              </div>
            )}
            {loading && (
              <div className="rounded-md shadow-lg m-4 bg-[#1E293B]">
                <div className="p-4 border-l-4 border-blue-500 text-white">
                  <ScaleLoader className="text-white" />
                </div>
              </div>
            )}
          </section>
          <section className="bg-slate-600 fixed bottom-0 left-0 w-full">
            <form
              onSubmit={handleSend}
              className="border border-slate-500 flex pl-4 pr-2 rounded-md"
            >
              <input
                type="text"
                multiple={true}
                className="flex-1 focus:outline-none bg-transparent text-white mr-2 my-2"
                placeholder="what should I help your with?..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button
                className="rounded-r-md px-4 border-l text-white"
                type="submit"
              >
                {loading ? "..." : "Ask"}
              </button>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}
