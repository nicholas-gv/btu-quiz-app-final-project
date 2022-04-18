import { useState, useEffect } from "react";


const useFetch = (data) => {
    const [questionsResponse, setQuestions] = useState();
    
    if (data.quiz===null) data.quiz="quiz1";

    useEffect(() => {
        let quizNum = (data.quiz!==null) ? Number.parseInt(data.quiz.slice(-1))-1 : 0

        if (!localStorage.getItem(data.key) || JSON.parse(localStorage.getItem(data.key)).expiry < data.currentTime 
        || (localStorage.getItem(data.key) && JSON.parse(localStorage.getItem(data.key)).data.id!==quizNum+1) ) {
            fetch(data.url)
            .then((res) => res.json())
            .then((res) => {
                let time = new Date().getTime();
                let item = {
                    data: res.quizes[quizNum],
                    expiry: time+60000
                };
                localStorage.setItem(data.key, JSON.stringify(item));
                setQuestions(res.quizes[quizNum]);
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