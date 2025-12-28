import Slider from "./Seaction2/Slider"
import AboutMe from "./Section3/AboutMe"
import ContactMe from "./Section4/ContactMe"

const MobileContent = ()=>{
    return(
        <>
            <section
                id="section-1"
                className="section lg:w-screen overflow-hidden  flex items-center justify-center text-6xl font-bold">

                <Slider />

              </section>

              <section
                id="section-2"
                className="section py-[2em] lg:w-screen overflow-hidden  flex items-center justify-center text-6xl font-bold">

                <AboutMe />
              </section>

              <section
                id="section-3"
                className="section lg:w-screen pb-[3em] flex items-center justify-center text-6xl font-bold">

                <ContactMe />
              </section>
        </>
    )
}
export default MobileContent