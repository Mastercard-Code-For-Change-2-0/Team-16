import React, {useEffect, useState} from 'react';
import {ChevronDown} from 'lucide-react';

const FAQ: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
                Here are some common questions and answers to help you navigate StudentNest.
            </p>

            <div className="max-w-2xl mx-auto space-y-4">
                {[{
                    question: "How do I find a Donor/Receiver?", answer: "Use our Novelty Features to connect with potential donor/receiver based on your preferences."
                }, {
                    question: "Is my donation secure?", answer: "Yes, we are with trusted organisations and verifying all details before making donations."
                }, {
                    question: "What if I face an issue with my donor/receiver?", answer: "You can report any issues to our support team, and we will guide you on the next steps."
                }].map((faq, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-lg font-semibold text-blue-600 focus:outline-none"
                        >
                            {faq.question}
                            <ChevronDown className={`h-6 w-6 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                        </button>
                        {openIndex === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;