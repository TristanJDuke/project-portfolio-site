import { useEffect, useState } from "react";

interface Message {
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
}

export default function Messages() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("http://localhost:3001/messages");
                if (!res.ok) throw new Error("Failed to fetch messages from backend");

                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();
    }, []);


    return (
        <div className="container mt-4">
            <h2>Submitted Messages</h2>

            {messages.length === 0 ? (
                <p className="text-muted">No messages have been submitted yet.</p>
            ) : (
                <div className="themed-container">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="mb-3 p-3 themed-input">
                            <h5>{msg.subject}</h5>
                            <p><strong>From:</strong> {msg.name}</p>
                            <p>{msg.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
