import axios from 'axios';
import React, { useEffect, useRef, useState} from 'react';
import './styles.css';
const getData = async (search) => {
    try{
        const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${search}`);
        return response.data?.hits;
    }
    catch(error){
        console.log(error);
    }
}
const HackNew = () =>{
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("react");
    useEffect(() =>{
        loadData.current();
    },[search]);
    const loadData = useRef({});
    loadData.current = async () =>{
        const pullData = await getData(search);
        console.log("Pull data: ", pullData);
        setData(pullData);
    }
    const handSearch = (e) =>{
        if(e.key === "Enter"){
            setSearch(e.target.value);
        }
    }
    return (
        <div>
            <div className="border-search">
                <input className="input-search" placeholder='search ...' onKeyDown={handSearch}/>
            </div>         
            <div className="load-data">
            {
                data.length > 0 && data.map((item, index) => (
                    <div key={index}>{item.title}</div>
                ))
            }
            </div>
        </div>
        
    );
}
export default HackNew;