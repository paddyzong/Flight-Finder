import React from 'react';
import { useState, FormEvent, ChangeEvent } from 'react';

interface Result {
    inputString: string;
    count: number;
}


export default function FlightFinder() {
    const [inputString, setInputString] = useState<string>('');
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState('');

    const validateInput = (input: string) => {
        if (!input.trim()) {
            setError('Please enter a string');
            return false;
        }

        if (!/^[a-z]*$/.test(input)) {
            setError('Input must contain only lowercase letters');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!validateInput(inputString)) return;

        try {
            const res = await fetch('http://localhost:8080/api/flight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputString }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                const firstError = Object.values(errorData)[0];
                setError(firstError as string);
                setResult(null);
                return;
            }

            const data = await res.json();
            setResult({ inputString, count: data.count });
            setError('');
        } catch (err) {
            setError('Unable to connect to backend. Please try again.');
            console.error(err);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputString(e.target.value.toLowerCase());
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <header className="bg-blue-700 text-white rounded-lg p-6 mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Flight Finder</h1>
                    <p className="opacity-90">
                        Find out how many instances of the word "flight" can be formed from a given string.
                    </p>
                </header>

                <main className="space-y-8">
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Enter Your String</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="inputString"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Enter a string (max 100 characters):
                                </label>
                                <input
                                    type="text"
                                    id="inputString"
                                    value={inputString}
                                    onChange={handleInputChange}
                                    maxLength={100}
                                    placeholder="e.g., flightflight"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {error && (
                                    <p id="input-error" className="mt-2 text-sm text-red-600">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Count Flights
                            </button>
                        </form>
                    </section>

                    {result && (
                        <section className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Result</h2>
                            <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-700">
                                <p className="mb-2">
                                    <span className="font-medium">Input:</span> {result.inputString}
                                </p>
                                <p>
                                    <span className="font-medium">Number of "flight" instances:</span>{' '}
                                    <span className="text-blue-700 text-lg font-bold">{result.count}</span>
                                </p>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
