import { useState } from "react";

export default function FrequencyInfo() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible((prev) => !prev);
    };

    return (
        <span className="position-relative d-inline-block text-center">
            <span
                onClick={toggleVisible}
                style={{
                    cursor: "pointer",
                    textDecoration: "underline dotted",
                    color: "var(--text-color)"
                }}
                title="Click to explain frequency score"
            >
                Frequency Score?
            </span>

            {visible && (
                <div
                    className="themed-container p-3 mt-2 text-start"
                    style={{
                        position: "absolute",
                        top: "2rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                        width: "320px",
                        fontSize: "0.9rem",
                        border: "2px solid var(--text-color)",
                        borderRadius: "0.75rem",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)"
                    }}
                >
                    <strong>Frequency Score?</strong>
                    <div className="mt-2">
                        <p className="mb-2">
                            Each letter in your word has a frequency value. Common letters like E and T have higher scores.
                        </p>
                        <p className="mb-2">
                            We sum the letter scores to calculate the total frequency score for your word.
                        </p>
                        <p className="mb-3">
                            Higher scores use more common letters and make better Wordle starters.
                        </p>
                        <p className="mb-0">
                            <strong>⭐ 25+</strong> = Excellent • <strong>20+</strong> = Good • Below = Risky
                        </p>
                    </div>
                </div>
            )}
        </span>
    );
}
