import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
   dangerouslyAllowBrowser: true,
})

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

export async function getRecipeFromGroq(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ")

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe I'd recommend I make!`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Groq Error:", error)
  }
}
