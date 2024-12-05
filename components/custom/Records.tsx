import React from 'react'
import DocCard from './DocCard'

const Records = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 border">
                    {
                        Array.from([0,1,2,3,4]).map(item => {
                            return(
                                <DocCard key={item}/>                                
                            )
                        })
                    }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Records
