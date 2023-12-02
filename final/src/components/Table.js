export default function Table({ data, searchTerm, setSearchTerm, searchFor }) {
    const renderedHeaders = data.headers.map((heading) => {
        return ( <
            td className = "row-align"
            key = { heading } > { heading } <
            /td>
        );
    });

    const renderedRows = data.entries.map((entry) => {
        const rows = entry.map((rowData) => {
            return <td className = "col-align" > { rowData } < /td>;
        });
        return <tr > { rows } < /tr>;
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return ( <
        div className = "details76234" >
        <
        div className = "recentOrders134ss53" >
        <
        div className = "cardHeader897y3" >
        <
        h2 > { data.title } < /h2> < /
        div > {
            setSearchTerm && ( <
                input className = "btn1231s srch"
                value = { searchTerm }
                onChange = { handleSearchChange }
                type = "text"
                placeholder = { "Search ".concat(searchFor) }
                />
            )
        } <
        table >
        <
        thead >
        <
        tr > { renderedHeaders } < /tr> < /
        thead > <
        tbody > { renderedRows } < /tbody> < /
        table > <
        /div> < /
        div >
    );
}