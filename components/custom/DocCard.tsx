"use client";

import React from 'react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from '../ui/button';
import Link from 'next/link';

interface DocCardProps {
    id: string;
    created_at: string;
    excuse: string;
    extension: string;
    excuse_url: string;
}

const DocCard: React.FC<DocCardProps> = ({  created_at, excuse, extension, excuse_url }) => {
    const [isHovered, setIsHovered] = useState(false);
    // console.log(id)
    const docs = [
        { uri: excuse_url }
    ];
    const handleWordDownload = async () => {
        try {
            const response = await fetch(excuse_url);
            const blob = await response.blob();

            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${excuse}.${extension}`;

            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    }
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-md">
            <div className="block relative h-56 rounded overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
            </div>

            <Button className='border mt-2 active:scale-95 mx-auto' onClick={handleWordDownload}>Download {extension} file</Button>
            <Button className='border mt-2 active:scale-95 mx-2'>

                <Link href={extension == 'docx' ? 'https://www.ilovepdf.com/word_to_pdf' : 'https://www.ilovepdf.com/pdf_to_word'} target='_blank'>Ilovepdf {extension} to {extension == 'docx' ? "pdf" : "docx"} file</Link>
            </Button>
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