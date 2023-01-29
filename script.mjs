import { Axios } from "axios";

// import axios from 'axios';
const sanskrit = document.querySelector('#sanskrit');
const transliteration = document.querySelector('#transliteration');
const translation = document.querySelector('#translation');

function generateURL() {
    let chapNo = Math.floor(Math.random() * 17) + 1; // so that it starts from 1
    const slokcount = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
    let slokNo = Math.floor(Math.random() * slokcount[chapNo - 1]) + 1; //gets the slok from the slokcount

    return `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapNo}/verses/${slokNo}/`
};

//Get the required URL for a random sloka 
//chapters 1-18, and slokaas depends on the slokcount 
const url = generateURL();


//Now call the API to get the response
async function getData(url) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'bfb2d58553mshb732bc4e4cfe2bfp15676cjsn46db110ee5c8',
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
            }
        };

        const response = await axios.get(url, options);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error.message);
    }
}

async function createNewSloka(data) {
    sanskrit.textContent = data.text;
    transliteration.textContent = data.transliteration;

    const transArr = await data.translations;
    console.log(transArr);
    const authArr = []
    transArr.forEach(ele => {
        if (ele.author_name === "Dr. S. Sankaranarayan") {
            authArr.push(ele);
        }
    });

    console.log(authArr);
    translation.textContent = authArr[0].description;
}

const data = getData(url).then((response) => createNewSloka(response)).catch((error) => console.log(error));