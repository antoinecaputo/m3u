let selectedPlaylist = "movies";

function search() {
    const limit = Number($("#result-count").val());
    console.log('limit', limit);

    const filter = $("#filter").val();
    console.log('filter', filter.toString());

    const query = $("#query").val();
    console.log('query', query.toString());

    const url = `/search?limit=${limit}&filter=${filter}&query=${query}`;

    console.log(url);

    if (query.length >= 3) {
        $.get(url, function(data) {
            $("#search-results").html(data);
        });
    } else {
        $("#search-results").empty();
    }
}