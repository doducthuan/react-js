import axios from 'axios';
import React, { useEffect, useRef, useState} from 'react';
import './styles.css';

const HackNew = () =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("react");
    const unmounted = useRef(true);
    const getData = async (search) => {
        try{
                const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${search}`);
                return response.data?.hits;
        
            
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() =>{
        loadData.current();
        return () => {
            unmounted.current = false;
        }
    },[search]);
    const loadData = useRef({});
    loadData.current = async () =>{   
        const pullData = await getData(search);
        if(unmounted.current){
            console.log("Pull data: ", pullData);
            setData(pullData);
            setLoading(false);
        }
        
        
    }
    const handSearch = (e) =>{      
        if(e.key === "Enter"){
            setLoading(true);
            setSearch(e.target.value);
        }
    }
    return (
        <div>
            <div className="border-search">
                <input className="input-search" placeholder='search ...' onKeyDown={handSearch}/>
            </div>
                    
            <div className="load-data">
            {loading && <p className="loadding">Đang tải dữ liệu ...</p>}
            {
                
                data.length > 0 && !loading && data.map((item, index) => (
                    <div key={index}>{item.title}</div>
                ))
            }
            </div>
        </div>
        
    );
}
export default HackNew;