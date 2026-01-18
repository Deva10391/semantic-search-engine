import { useSelector } from "react-redux";
import ShowOne from "./ShowOne";

export default function ShowSearches () {
    const search_opts = useSelector((state) => state.searches.search_options);
    
    return (
        <div id="main_container">
            {(search_opts && search_opts.length) > 0 ? (
                search_opts.map((opt, key) => (
                    <ShowOne key={key} search={opt} />
                ))
            ):(
                <div></div>
            )}
        </div>
    );
}