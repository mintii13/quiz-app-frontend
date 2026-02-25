import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [questions, setQuestions] = useState([]);
    
    // Form state
    const [text, setText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
    const [editId, setEditId] = useState(null);

    const axiosConfig = { headers: { Authorization: `Bearer ${user?.token}` } };

    const fetchQuestions = async () => {
        try {
            const res = await axios.get('https://quiz-app-be-six.vercel.app/questions');
            setQuestions(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load questions from server');
        }
    };

    useEffect(() => {
        fetchQuestions();
        // eslint-disable-next-line
    }, []);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { text, options, correctAnswerIndex: Number(correctAnswerIndex) };
        
        try {
            if (editId) {
                await axios.put(`https://quiz-app-be-six.vercel.app/questions/${editId}`, payload, axiosConfig);
                toast.success('Question updated successfully!');
            } else {
                await axios.post('https://quiz-app-be-six.vercel.app/questions', payload, axiosConfig);
                toast.success('Question added successfully!');
            }
            fetchQuestions();
            resetForm();
        } catch (err) {
            toast.error('Operation failed! Check console.');
            console.error(err);
        }
    };

    const handleEdit = (q) => {
        setEditId(q._id);
        setText(q.text);
        setOptions(q.options.length === 4 ? q.options : [...q.options, '', '', ''].slice(0, 4));
        setCorrectAnswerIndex(q.correctAnswerIndex);
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this question?')){
            try {
                await axios.delete(`https://quiz-app-be-six.vercel.app/questions/${id}`, axiosConfig);
                toast.success('Question deleted successfully!');
                fetchQuestions();
            } catch (err) {
                toast.error('Failed to delete question!');
            }
        }
    };

    const resetForm = () => {
        setEditId(null);
        setText('');
        setOptions(['', '', '', '']);
        setCorrectAnswerIndex(0);
    };

    return (
        <div>
            <Navbar title="Admin Dashboard" />
            
            <h3 className="mb-3 fw-bold">Questions</h3>
            
            {/* Card Form */}
            <div className="card mb-4 border-secondary-subtle">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3 align-items-center">
                            <div className="col-2"><label>Question Text:</label></div>
                            <div className="col-10">
                                <input type="text" className="form-control form-control-sm" value={text} onChange={e => setText(e.target.value)} required />
                            </div>
                        </div>
                        
                        <div className="row mb-3">
                            <div className="col-2"><label>Options:</label></div>
                            <div className="col-10 d-flex flex-column gap-2">
                                {options.map((opt, i) => (
                                    <input key={i} type="text" className="form-control form-control-sm" value={opt} onChange={e => handleOptionChange(i, e.target.value)} required />
                                ))}
                            </div>
                        </div>
                        
                        <div className="row mb-3 align-items-center">
                            <div className="col-2"><label>Correct Answer Index:</label></div>
                            <div className="col-10">
                                <input type="number" min="0" max="3" className="form-control form-control-sm" value={correctAnswerIndex} onChange={e => setCorrectAnswerIndex(e.target.value)} required />
                            </div>
                        </div>
                        
                        <button type="submit" className={`btn w-100 ${editId ? 'btn-success' : 'btn-primary'}`}>
                            {editId ? 'Update Question' : 'Add Question'}
                        </button>
                        {editId && <button type="button" className="btn btn-secondary w-100 mt-2" onClick={resetForm}>Cancel Edit</button>}
                    </form>
                </div>
            </div>

            {/* List of Questions */}
            <div className="d-flex flex-column gap-3">
                {questions.map((q) => (
                    <div key={q._id} className="card border-secondary-subtle">
                        <div className="card-body">
                            <h4 className="card-title fw-bold mb-3">{q.text}</h4>
                            <ul className="mb-4">
                                {q.options.map((opt, idx) => (
                                    <li key={idx} className="mb-1">{opt}</li>
                                ))}
                            </ul>
                            <div>
                                <button className="btn btn-warning me-2 text-dark" onClick={() => handleEdit(q)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(q._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;