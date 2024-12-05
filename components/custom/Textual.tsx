"use client";

import { motion } from "motion/react"
import React from 'react'
import InputDemo from "./InputName"
import SelectDemo from "./SelectorType"
import SubmitBtn from "./SubmitBtn";

const Textual = () => {
    return (
        <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0, transition:{duration:1}}} >
            <motion.p className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                For the student&apos;s <br />
                By the student&apos;s
            </motion.p>
            <div className=" flex justify-center items-center container gap-4">

                <InputDemo placeholder="Excuse in one line" type="text" />
                <SelectDemo />
                <SubmitBtn/>
            </div>
        </motion.div>
    )
}

export default Textual
