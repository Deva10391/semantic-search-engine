function ShowSearch({search}){
    return (
        <>
            <div
            className="show_search"
            style={{
                padding: "10px",
                margin: "5px",
                marginLeft: "0px",
                marginRight: "0px",
                border: "1px solid black",
                borderRadius: "5px",
                cursor: "pointer",
            }}>
                {search.slice(0, 110)}
            </div>
        </>
    )
}

export default ShowSearch;