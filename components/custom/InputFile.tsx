"use client"

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dropzoneVariants = {
  idle: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: { scale: 1.05, boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" }
}

const fileIconVariants = {
  initial: { rotate: -15, scale: 0.8 },
  animate: { rotate: 0, scale: 1 }
}

export function AnimatedFileInput() {

  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [excuseText, setExcuseText] = useState("")
  const [extText, setExtText] = useState("pdf")

  const { toast } = useToast()


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

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

  const handleSubmitFile = async () => {
    
    setIsUploading(true)
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }
    try {
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(file?.name, file);
        console.log(data)
        if(error) throw error;
      const { data: mainData, error: mainErr } = await supabase.from("docs").insert({
        "excuse": excuseText,
        "extension": extText,
        "excuse_url": `https://gzswgnzgngqmomqiuilw.supabase.co/storage/v1/object/public/${data?.fullPath}`
      })
      console.log(mainData)
      if ( mainErr) throw error;

      toast({
        title: "File uploaded successfully!",
        description: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
      })
      setIsUploading(false)
    } catch (error) {
      toast({
        title: "Error uploading file.",
        description: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }),
      })
      console.log(error)
      setFile(null);
      
      setIsUploading(false)
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <>
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
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-primary' : 'border-gray-300 dark:border-gray-700'
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
      <div className="text-center lg:w-2/3 w-full py-4 flex flex-col justify-center items-center ">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} >
          <motion.p className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            For the student&apos;s <br />
            By the student&apos;s <br />
            To the student&apos;s
          </motion.p>
          <div className=" flex justify-center items-center container gap-4">

            <div className="space-y-2 min-w-96">
              <Input
                id="input-07"
                className="border-transparent bg-muted shadow-none"
                placeholder={"Excuse in one line"}
                type={"email"}
                onChange={e => setExcuseText(e.target.value)}
              />
            </div>
            <div className="space-y-2 border-transparent bg-muted shadow-none rounded-md">
              <Select defaultValue="pdf" onValueChange={(value) => setExtText(value)}>
                <SelectTrigger id="select-31">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                  <SelectItem value="pdf">pdf</SelectItem>
                  <SelectItem value="docx">doc/docx/word</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disabled={isUploading} className="border bg-white text-black hover:bg-white active:scale-95" onClick={handleSubmitFile}>
              {
                isUploading ? (
                  <>
                    <LoaderCircle
                      className="-ms-1 me-2 animate-spin"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>

                  </>
                )
              }
              Submit
            </Button>
          </div>
        </motion.div>
      </div>
    </>

  )
}

