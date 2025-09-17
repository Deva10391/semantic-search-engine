import { useState } from "react";
import { useDispatch } from 'react-redux';
import { changeSearchResults, changeSearchValue, loadMore } from '../action';


function TakeSearch() {
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState("");

    const getSearch = (e) => {
        e.preventDefault();
        // console.log(searchData);
        fetch('http://127.0.0.1:8000/get_search_results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'search': searchData,
            }),
            })
            .then(res => res.json())
            .then((data) => {
                setSearchData("");
                dispatch(changeSearchResults(data.message));
            })
            .catch(err => console.error('Error:', err));
    }

    const changeSearch = (e) => {
        const val = e.target.value;
        setSearchData(val);
        dispatch(changeSearchValue(val));
    }

    return (
        <div
        style={{
            padding: "10px",
            paddingLeft: "0px",
            paddingRight: "0px",
        }}>
            <form
            onSubmit={getSearch}
            style={{
                display: "flex",
                flexDirection: "row",
            }}
            >
                <button
                className="sr"
                type="button"
                onClick={() => dispatch(loadMore(true))}
                >
                    reload
                </button>
                <input
                value={searchData}
                onChange={changeSearch}
                placeholder="Search"
                style={{
                    width: "500px",
                    height: "15px",
                    padding: "10px",
                    borderRadius: "5px",
                    marginLeft: "10px",
                    marginRight: "10px",
                }}
                />
                <button
                type="submit"
                className="sr"
                >search
                </button>
            </form>
        </div>
    )
}

export default TakeSearch;