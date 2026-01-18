export default function Pair({name, content}){
    return(
        <div>
            <div className="pairH">{name}</div>
            <hr />
            <div
            className="pair">{content}
            </div>
        </div>
    )
}