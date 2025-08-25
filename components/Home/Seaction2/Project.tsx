"use client"

import { useLocale } from "next-intl";

const Project = ()=>{
     const locale = useLocale();
    return (
        <>
        <div className="Project overflow-hidden my-auto group/proj hover:cursor-pointer rounded-4xl h-full w-full flex flex-col">
            <div className="projIMG w-full rounded-4xl flex h-full">
                <img src="/images/proj.jpg" alt="" className="rounded-4xl w-full h-full object-cover" />
            </div>
            <div className={`${locale === 'fa' ? 'group-hover/proj:right-0 right-[-100%]':'group-hover/proj:left-0 left-[-100%]'} overlayCard rounded-4xl 
             bg-[#be77dc86] w-full h-full z-10 absolute  
            right-0 duration-[.4s]`}>
               <div className="proj-name h-full  persian w-full my-auto flex justify-center items-center flex-wrap">
                <p className="persian text-2xl">
                    
                     مبلمان عالیجناب
                </p>
               </div>
            </div>
        </div>
        </>
    )
}
export default Project

function useTranslation(): { i18n: any; } {
    throw new Error("Function not implemented.");
}
