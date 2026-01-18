import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { set_search_opts } from '../../Store/Slice';

export default function Reload(){
    const dispatch = useDispatch();

    const reload_func = async() => {
        const res = await fetch('http://localhost:3000/load_all/');
        const val = await res.json();
        dispatch(set_search_opts(val.data));
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