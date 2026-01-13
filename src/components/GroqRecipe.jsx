
import Markdown from "react-markdown"
export default function GroqRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
          <h2>Chef Groq Recommends: </h2>
          <Markdown>{props.recipe}</Markdown> 
        </section>
    )
}
