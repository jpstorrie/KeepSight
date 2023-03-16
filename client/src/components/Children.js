import {useEffect, useState} from "react"

export default function Children() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch("/hello")
            .then((r) => r.json())
            .then((data) => setCount(data.count));
    }, []);


    return (
        <h1 className="text-3xl font-bold">Page Count: {count}</h1>
    )
}