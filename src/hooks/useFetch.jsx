import { useState, useEffect } from "react";

const useFetch = (data) => {
    const [questionsResponse, setQuestions] = useState();

    useEffect(() => {
        if (!localStorage.getItem(data.key) || JSON.parse(localStorage.getItem(data.key)).expiry < data.currentTime ) {
            localStorage.removeItem(data.key);
            fetch(data.url)
            .then((res) => res.json())
            .then((res) => {
                let time = new Date().getTime();
                let item = {
                    data: res,
                    expiry: time+600000
                };
                localStorage.setItem(data.key, JSON.stringify(item));
                setQuestions(res);
        });
        } else if (localStorage.getItem(data.key)) {
            let res = JSON.parse(localStorage.getItem(data.key)).data;
            setQuestions(res);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [questionsResponse];
};

export default useFetch;