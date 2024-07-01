"use client"; // Add this line at the top

import Image from "next/image";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard"
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

async function fetchExploreData() {
  try {
    const res = await fetch('/api/exploreData');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching explore data:', error);
    return [];
  }
}

async function fetchCardsData() {
  try {
    const res = await fetch('/api/cardsData');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching cards data:', error);
    return [];
  }
}

export default function Home() {
  const [exploreData, setExploreData] = useState([]);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const exploreData = await fetchExploreData();
      const cardsData = await fetchCardsData();
      setExploreData(exploreData);
      setCardsData(cardsData);
    }
    loadData();
  }, []);

  return (
    <div>
      <Header placeholder={undefined} />
      <Banner />
      <main className="text-black max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold">Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData.map(({ img, distance, location }) => (
              <SmallCard
                key={img}  
                img={img} 
                distance={distance} 
                location={location} 
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8 text-black'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3'>
            {cardsData?.map(({ img, title}) => (
              <MediumCard
                key={img}  
                img={img} 
                title={title} 
              />
            ))}
          </div>
        </section>
        <LargeCard 
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists crated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer/>
    </div>
  );
}
