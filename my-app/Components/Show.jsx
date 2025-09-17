import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TakeSearch from "./TakeSearch";
import ShowSearch from "./ShowSearch";
import { changeSearchResults, loadMore } from "../action";

function Show() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.semantic.load_more);
    const searches = useSelector((state => state.semantic.search_results))

    const get_the_searches = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/get_initial_entities")
            const data = await res.json()
            dispatch(changeSearchResults(data.message));
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(loadMore(false));
        };
    }

    useEffect(() => {
        get_the_searches();
    }, []);

    if (loading) {
        get_the_searches();
    }

    return (
        <div
            style={{
                margin: "5px",
            }}>
                <TakeSearch />
                {loading ? (
                    <div>Please Wait...</div>
                ) : searches.length > 0 ? (
                    <>
                    <hr />
                    {searches.map((search, key) => 
                        <ShowSearch key={key} search={search}/>
                    )}
                    </>
                ) : (
                    <div>No data rn</div>
                )}
        </div>
    )
};

export default Show;