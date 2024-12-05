"use client";

import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { motion } from "framer-motion";
import { useState } from "react";


const DocCard = () => {

    const [isHovered, setIsHovered] = useState(false);

    const docs = [
        // { uri: "https://gzswgnzgngqmomqiuilw.supabase.co/storage/v1/object/public/documents/(4_12_2024).pdf" },
        { uri: "https://gzswgnzgngqmomqiuilw.supabase.co/storage/v1/object/public/documents/demo.docx" }, 
    ];
    return (
        <>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-md">
                <div className="block relative h-56 rounded overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" /> */}
                    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
                </div>
                <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: -10 }} 
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }} // Show or hide based on hover state
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h3 className="text-gray-200 text-xs tracking-widest title-font mb-1">
                        CATEGORY
                    </h3>
                    <h2 className="text-gray-200 title-font text-lg font-medium">
                        The Catalyzer
                    </h2>
                    <p className="mt-1">$16.00</p>
                </motion.div>
            </div>

        </>
    )
}

export default DocCard
