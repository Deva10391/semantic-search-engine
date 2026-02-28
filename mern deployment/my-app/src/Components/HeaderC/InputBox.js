import { useDispatch, useSelector } from 'react-redux';
import { set_loading, set_search_opts } from '../../Store/Slice';
import { useState } from "react";

export default function InputBox () {
    const port = useSelector((state) => state.api.port)
    const [toSearch, setToSearch] = useState('');

    const dispatch = useDispatch();

    const do_a_search = async () => {
        try {
            dispatch(set_loading(true));
            const data = await fetch(`${port}/search/`, {
                method: 'POST',
                headers: { 'Content-Type': "application/json"},
                body: JSON.stringify({toSearch}),
            });
            const res = await data.json();
            dispatch(set_search_opts(res.data));
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(set_loading(false));
        }
    };
    
    return (
        <div className='f_c' style={{width: '100%'}}>
            <input
            id='inp'
            placeholder='Search Text'
            onChange={(e) => setToSearch(e.target.value)}
            />
            <button
            onClick={do_a_search}
            >GO</button>
        </div>
    )
}