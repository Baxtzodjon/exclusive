"use client"

import Services from "@/components/Services";
import ServicesSec from "@/components/ServicesSec";
import Story from "@/components/Story";
import Team from "@/components/Team";

const page = () => {
    return (
        <div>

            <Story />

            <ServicesSec />

            <Team />

            <Services />

        </div>
    )
}

export default page;