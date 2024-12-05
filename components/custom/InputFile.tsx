"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Check, X, FileIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

const dropzoneVariants = {
  idle: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: { scale: 1.05, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" }
}

const fileIconVariants = {
  initial: { rotate: -15, scale: 0.8 },
  animate: { rotate: 0, scale: 1 }
}

export function AnimatedFileInput() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-md  mt-8">
      <AnimatePresence mode="wait">
        {!file && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
                opacity: 1, 
                y: 0,
                ...isDragging ? { scale: 1.05 } : { scale: 1 }
              }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary' : 'border-gray-300 dark:border-gray-700'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            variants={dropzoneVariants}
            whileHover="hover"
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isDragging ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Upload className="w-16 h-16 text-gray-400 dark:text-white-600 mb-4" />
                </motion.div>
                <motion.p 
                  className="text-lg font-semibold mb-2 text-gray-400 dark:text-gray-300"
                  animate={{ scale: isDragging ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Drag & Drop your file here
                </motion.p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or</p>
                <Button variant="outline" onClick={() => handleFileChange}>Choose File</Button>
              </div>
            </label>
          </motion.div>
        )}

        {file && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-green-100 dark:bg-green-900 rounded-lg p-6 flex items-center justify-between"
          >
            <div className="flex items-center">
              <motion.div
                variants={fileIconVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, type: "spring" }}
              >
                <FileIcon className="w-10 h-10 text-green-500 dark:text-green-400 mr-4" />
              </motion.div>
              <div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-medium text-gray-800 dark:text-gray-200"
                >
                  {file.name}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </motion.p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <X className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

