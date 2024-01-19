let selectedPlaylist = "";

function clearSearchInput() {
    $("#query").val("");
    $("#search-results").empty();
}

function selectPlaylist(selector) {
    const elementId = selector.currentTarget.id;

    console.log('selector:', selector.currentTarget);

    console.log('elementId:', elementId);

    // set class to bg-gray-200 for all button from #playlist-selector
    $("#playlist-selector button").removeClass("bg-blue-200");

    // set class to bg-blue-200 for selected element
    $(`#playlist-selector #${elementId}`).addClass("bg-blue-200");

    selectedPlaylist = elementId.replace("playlist-", "")
        .replace("all", "")
        .toUpperCase();

    search();
}

function search() {
    const limit = 100; //| Number($("#result-count").val());
    console.log('limit', limit);

    const query = $("#query").val();
    console.log('query', query.toString());


    if(query.length < 3) {
        $("#search-results").empty();
        return;
    }

    const url = `/search?limit=${limit}&playlist=${selectedPlaylist}&query=${query}`;
    console.log('url:', url);

    $.get(url, function(data) {
        $("#search-results").html(data);
    });
}

function displayResumes() {
    const url = "/resumes";

    $.get(url, function(data) {
        $("#search-results").html(data);
    });
}