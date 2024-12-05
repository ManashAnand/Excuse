"use client";

import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { motion } from "framer-motion";
import { useState } from "react";

interface DocCardProps {
    id: string;
    created_at: string;
    excuse: string;
    extension: string;
    excuse_url: string;
}

const DocCard: React.FC<DocCardProps> = ({ id, created_at, excuse, extension, excuse_url }) => {
    const [isHovered, setIsHovered] = useState(false);

    const docs = [
        { uri: excuse_url }
    ];

    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-md">
            <div className="block relative h-56 rounded overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
            </div>
            <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: -10 }} 
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <h3 className="text-gray-200 text-xs tracking-widest title-font mb-1">
                    {extension}
                </h3>
                <h2 className="text-gray-200 title-font text-lg font-medium">
                    {excuse}
                </h2>
                <p className="mt-1">{new Date(created_at).toLocaleDateString()}</p>
            </motion.div>
        </div>
    )
}

export default DocCard