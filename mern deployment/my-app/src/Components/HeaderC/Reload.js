import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { set_search_opts, set_loading } from '../../Store/Slice';

export default function Reload(){
    const port = useSelector((state) => state.api.port)
    const dispatch = useDispatch();

    const reload_func = async() => {
        dispatch(set_loading(true));
        try{
            const res = await fetch(`${port}/load_all/`);
            const val = await res.json();
            dispatch(set_search_opts(val.data));
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(set_loading(false));
        }
    };

    useEffect(() => {
        reload_func();
    }, [reload_func]);

    return (
        <div id='rel'>
            <button
            onClick={reload_func}>
                reload
            </button>
        </div>
    )
}