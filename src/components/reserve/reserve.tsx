import React, { ChangeEvent, DOMAttributes, FormEvent, useEffect, useState } from 'react';
import Loader from '../loader/loader';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { InlineSpinner } from 'react-tailwind-loaders';
import Pathes from '../../router/pathes';
import { reserve } from '../../services/reservationService';

function Reserve() {

    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setDate(event.target.value);
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        console.log("name: ", name);
        console.log("date: ", date);
        await reserve(name, date);
        setLoading(false);
        navigate(Pathes.homePath);
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Reserve Your Appointment
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={name}
                                    onChange={onNameChange}
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="date"
                                    name="date"
                                    type="datetime-local"
                                    autoComplete="email"
                                    value={date}
                                    onChange={onDateChange}
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            {loading ? <div className='h-12 w-12'><InlineSpinner /> </div> : <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reserve
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Reserve;