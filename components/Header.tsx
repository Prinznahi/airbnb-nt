import React, { useState } from 'react';
import Image from 'next/image';
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  placeholder?: string;
}

function Header({ placeholder }: HeaderProps) {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();
  
  const resetInput = () => {
    setSearchInput('');
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate && endDate) {
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  const search = () => {
    const query = new URLSearchParams({
      location: searchInput,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      noOfGuests: noOfGuests.toString(),
    }).toString();

    router.push(`/search?${query}`);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10'>
      <div onClick={() => router.push('/')} className='relative flex items-center h-10 cursor-pointer '>
        <Image 
          src={'https://links.papareact.com/qd3'}
          alt=''
          objectFit='contain'
          layout='fill'
          objectPosition='left'
        />
      </div>

      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm text-sm text-gray-600 placeholder-gray-400'>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type='text'
          placeholder={placeholder || 'Start your search'}
          className='pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400'
        />
        <SearchIcon className='hidden md:inline h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />
      </div>

      <div className='flex items-center justify-end space-x-4 text-gray-500'>
        <h1 className='hidden md:inline cursor-pointer'>Become a host</h1>
        <GlobeAltIcon className='h-6 cursor-pointer' />
        <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
          <MenuIcon className='h-6 cursor-pointer' />
          <UserCircleIcon className='h-6 cursor-pointer' />
        </div>
      </div>

      {searchInput && (
        <div className='text-black flex flex-col col-span-3 mx-auto '>
          <DateRangePicker 
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />
          <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
            <UsersIcon className='h-5' />
            <input 
              type="number" 
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(Number(e.target.value))}
              min={1}
              className='w-12 pl-2 text-lg outline-none text-red-400'
            />
          </div>
          <div className='flex'>
            <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
            <button onClick={search} className='flex-grow text-red-400'>Search</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
