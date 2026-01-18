import Pair from "./Pairs";

export default function ShowOne({search}) {
    return (
        <div className="containers">
            <div className="titleC">{search['Job Title']}</div>
            <hr />
            <div className="f_r">
                <Pair name={"Job Description"} content={search['Job Description']} />
                <Pair name={"Additional Info"} content={search['Unnamed: 0']} />
            </div>
        </div>
    );
}