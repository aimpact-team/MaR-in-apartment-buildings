import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';
const Incidents = ({ initialData}) => {
    const [data, setData] = useState(initialData);
    const [limit, setLimit] = useState(15);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://46.243.227.95:8000/objects/?limit=${limit}&offset=${offset}&model=incident`);
            const newData = await response.json();
            setData(newData);
        };

        fetchData();
    }, [limit, offset]);

    const handleClickPlus = () => {
        setOffset(offset + 15);
    };
    const handleClickMinus = () =>{
        setOffset(offset - 15)
    }

    return (
        <div className='bg-white flex flex-col justify-center w-[2/3] ml-[30%] py-10'>
            <Link href={'../'} className='' ><p>Предыдущая страница</p></Link>
            {data?.length === 0 ? (
                <div>Загружается</div>
            ) : (data?.map(address => (
                    <div className='w-[80%] my-5' key={address.id}>
                        <Link href={'/incident/'+ address.id}>
                            <p className='text-left text-black mb-1'>{address.name} </p> <p className='text-left text-black mb-1'>Предсказано работ: {address.num_works}</p>
                            <span className='text-left text-black'>Один из возможных: {address.works_list[1]}</span>
                        </Link>
                    </div>
                ))
            )}
            <div className=' mx-5 mt-5'>
                {offset === 0 ?(
                    <div></div>
                ) :(
                    <button onClick={handleClickMinus} className="mr-10 text-blue-500">Предыдущие</button>
                )}
                 {offset === 195 ?(
                    <div></div>
                ) :(
                <button onClick={handleClickPlus} className="text-blue-500">Следующие</button>
                )}
            </div>
        </div>
    )
};

Incidents.getInitialProps = async () => {
    const response = await fetch("http://46.243.227.95:8000/objects/?model=incident&limit=15&offset=0");
    const initialData = await response.json();
    return { initialData };
};

export default Incidents;