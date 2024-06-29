import {ChatPromptTemplate} from "@langchain/core/prompts";
import {ChatOllama} from "@langchain/community/chat_models/ollama";
import {WikipediaQueryRun} from "@langchain/community/tools/wikipedia_query_run";


const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "mistral",
  format: "json",
});

const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an cinema expert. Format all responses as JSON objects with the following keys: "title", "description", "year", "cast".`
    ],
    ["human", `From wikipedia results, what is this movie about?
    If there are multiple results, please choose the most relevant one: {wikipediaResult}`],
  ]
);

const chain = prompt.pipe(model);

const wikipediaQueryRun = new WikipediaQueryRun({
  topKResults: 3,
  maxDocContentLength: 4000,
});

console.log('⏳ Model is starting...')
console.log('✅ Ready')


/**
 * Get movie from wikipedia
 * @param name {string}
 * @returns {Promise<{title: string, description: string, year: string, cast: string, image: string}>}
 */
export async function getMovie(name) {
  const wikipediaResult = await wikipediaQueryRun.invoke(name);

  console.log(wikipediaResult);

  const result = await chain.invoke({wikipediaResult});

  const content = result.content.replace(/'/g, '"')

  console.log(content);

  return JSON.parse(content);
}