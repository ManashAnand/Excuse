"use client";
import React from 'react'
import DocCard from './DocCard'
import useSWR from 'swr'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react'

interface ExcuseInterface {
    id: string;
    created_at: string;
    excuse: string;
    extension: string;
    excuse_url: string;
}

const Records = () => {
    const fetcher = async () => {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
          .from('docs')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        console.log(data)
        return data;
      };

    const [Excuses, setExcuses] = useState<ExcuseInterface[]>([])

    const { data: excuses, error, isLoading } = useSWR('excuses', fetcher)
    useEffect(() => {
        if (excuses) {
          setExcuses(excuses);
        }
      }, [excuses]);
    
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 ">
                        {Excuses?.map(ticket => (
                            <DocCard
                                key={ticket.id}
                                id={ticket.id}
                                created_at={ticket.created_at}
                                excuse={ticket.excuse}
                                extension={ticket.extension}
                                excuse_url={ticket.excuse_url}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Records
