"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from 'next/navigation';
import { format, isValid } from "date-fns";
import InfoCard from '@/components/InfoCard';

function SearchComponent() {
    const searchParams = useSearchParams();
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [noOfGuests, setNoOfGuests] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchParams) return;

        const params = Object.fromEntries(searchParams.entries());
        setLocation(params.location || '');
        setStartDate(params.startDate || '');
        setEndDate(params.endDate || '');
        setNoOfGuests(params.noOfGuests || '');
    }, [searchParams]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch("/api/searchResults");
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setSearchResults(data);
            } catch (error) {
                setError((error as Error).message);
                console.error("Failed to fetch data:", error);
            }
        };

        fetchSearchResults();
    }, []);

    const formattedStartDate = isValid(new Date(startDate)) ? format(new Date(startDate), "dd MMMM yy") : '';
    const formattedEndDate = isValid(new Date(endDate)) ? format(new Date(endDate), "dd MMMM yy") : '';
    const range = `${formattedStartDate} - ${formattedEndDate}`;

    return (
        <div className='h-screen'>
            <title>Search</title>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
            <main className='flex'>
                <section className='flex-grow pt-14 px-6'>
                    <p className='text-xs'>300+ Stays - {range} - for {noOfGuests} guests</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6 text-gray-800 whitespace-nowrap'>Stay in {location}</h1>
                    <div className='hidden lg:inline-flex space-x-3 mb-5'>
                        <p className='button'>Cancellation Flexibility</p>
                        <p className='button'>Type of Place</p>
                        <p className='button'>Price</p>
                        <p className='button'>Rooms & Beds</p>
                        <p className='button'>More filters</p>
                    </div>
                    <div className='flex flex-col'>
                        {searchResults.map(({img, location, title, description, star, price, total}) => (
                            <InfoCard 
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function Search() {
    return (
        <Suspense fallback={<div>Loading search parameters...</div>}>
            <SearchComponent />
        </Suspense>
    );
}

export default Search;
