import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('https://quiz-app-be-six.vercel.app/questions');
                setQuestions(res.data.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswerSubmit = () => {
        if (selectedOption === questions[currentQuestion].correctAnswerIndex) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption(null);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
        setSelectedOption(null);
    };

    if (questions.length === 0) return <div><Navbar title="Dashboard" /><div className="text-center mt-5">Loading quiz...</div></div>;

    return (
        <div>
            <Navbar title="Dashboard" />
            
            <div className="d-flex flex-column align-items-center mt-5">
                {showScore ? (
                    <div className="text-center">
                        <h2 className="fw-bold mb-3">Quiz Completed</h2>
                        <p className="fs-5">Your score: {score}</p>
                        <button className="btn btn-primary px-4 mt-2" onClick={restartQuiz}>Restart Quiz</button>
                    </div>
                ) : (
                    <div style={{ minWidth: '400px' }}>
                        <h2 className="text-center fw-bold mb-4">Quiz</h2>
                        <h4 className="mb-3">{questions[currentQuestion].text}</h4>
                        <div className="mb-4">
                            {questions[currentQuestion].options.map((opt, index) => (
                                <div key={index} className="form-check mb-2">
                                    <input 
                                        className="form-check-input border-secondary" 
                                        type="radio" 
                                        name="quizOption" 
                                        id={`option${index}`}
                                        checked={selectedOption === index}
                                        onChange={() => setSelectedOption(index)}
                                    />
                                    <label className="form-check-label" htmlFor={`option${index}`}>
                                        {opt}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleAnswerSubmit} 
                            disabled={selectedOption === null}
                        >
                            Submit Answer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;