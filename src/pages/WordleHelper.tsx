import { useState } from "react";

//JSON loot
import answers from "../data/answers.json";
import rawFrequencies from "../data/frequencies.json";
import validWords from "../data/valid-words.json";
//components
import FrequencyInfo from "../components/FrequencyInfo";

const frequencies: Record<string, number> = rawFrequencies;

export default function WordleHelper() {
    const [word, setWord] = useState("");
    const [result, setResult] = useState<string | null>(null);
    document.title = "Wordle Helper | Portfolio";

    const analyzeWord = (input: string): string => {
        const vowels = "aeiou";
        const letters = input.toLowerCase().split("");

        let vowelCount = 0;
        let consonantCount = 0;
        let score = 0;

        letters.forEach((ch) => {
            if (vowels.includes(ch)) {
                vowelCount++;
            } else {
                consonantCount++;
            }

            const freq = frequencies[ch];
            if (freq) score += freq;
        });

        return (
            `📊 Letter Analysis for "${input.toUpperCase()}":\n` +
            `- Vowels: ${vowelCount}\n` +
            `- Consonants: ${consonantCount}\n` +
            `- Total Frequency Score: ${score.toFixed(2)}\n` +
            `- Word Quality: ${score >= 25 ? "⭐ Excellent" : score >= 20 ? "👍 Good" : "🟡 Okay"}`
        );
    };
      
    const handleCheck = () => {
        const upperWord = word.toUpperCase();
        if (upperWord.length !== 5) {
            setResult("Please enter a 5-letter word.");
            return;
        }
        if (!validWords.includes(upperWord.toLowerCase())) {
            setResult(`❌ "${word}" is not a valid 5-letter word.`);
            return;
          }

        if (answers.includes(upperWord)) {
            setResult(`❌ ${upperWord} has been a Wordle answer. Time to try something new!`);
        } else {
            const analysis = analyzeWord(upperWord);
            setResult(`✅ ${upperWord} has not been a Wordle answer.\n\n${analysis}`);
        }
    };
      

    return (
        <div className="container mt-4">
            <h2>Wordle Helper</h2>
            <div className="themed-container mt-3">
                <p>Enter a 5-letter word to see if it's been a Wordle answer or how good it is.</p>
                <input
                    className="form-control themed-input mb-2"
                    maxLength={5}
                    value={word}
                    onChange={(e) => setWord(e.target.value.toLowerCase())}
                />
                <button className="btn btn-primary" onClick={handleCheck}>Check</button>

                {result && (
                    <pre className="mt-3 themed-container text-monospace" style={{ whiteSpace: "pre-wrap" }}>
                        {result}
                    </pre>
                )}
                <h4 className="mt-4">
                    <FrequencyInfo />
                </h4>
            </div>
        </div>
    );
}
