"use client";
import React from 'react'
import DocCard from './DocCard'

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


    const [Excuses, setExcuses] = useState<ExcuseInterface[]>([])
    const supabase = createClientComponentClient();

    useEffect(() => {
        const fetchTickets = async () => {
            const { data, error } = await supabase
                .from('docs')
                .select('*')
            console.log(error)
            if (data) {
                setExcuses(data)
            }
        }

        fetchTickets()
    }, [supabase])
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 border">
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
