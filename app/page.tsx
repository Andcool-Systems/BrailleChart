"use client";

import { useEffect, useState } from "react";
import BrailleChart from "./brailleChart.module";
import { getPixelColor } from "./perlin.module";

const Home = () => {
    const [values, setValues] = useState<number[]>([]);

    useEffect(() => {
        const something = setInterval(() => {
            const temp = [];
            for (let x = 0; x < 365; x++) {
                temp.push(Number(getPixelColor(x, new Date().getTime() / 100)));
            }
            setValues(temp);
        }, 16);

        return () => { clearInterval(something) }
    }, [])

    return (
        <main>
            <BrailleChart values={values} height={10} colormatic={true} />
        </main>
    );
}

export default Home;
