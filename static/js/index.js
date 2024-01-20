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

let loadLock = false;
function load() {
    if(loadLock) {
        showToast("Please wait for the current load to finish", false);
        return;
    }

    $.get("/load", function(data) {
        showToast(data, true);
    }).fail(function(e) {
        showToast(e.responseText, false);
    }).always(function() {
        loadLock = false;
    });
}

function displayResumes() {
    const url = "/resumes";

    $.get(url, function(data) {
        $("#search-results").html(data);
    });
}


function showToast(message, success = true) {
    const toastElement = $("#toast-container");

    // A message is already displayed
    if (!toastElement.hasClass("hidden")) {
        console.log('toast is not hidden');

        // opacity-100 is always treated as priority on opacity-0
        // so add it first for animation in
        toastElement.addClass("opacity-0");
        toastElement.removeClass("opacity-100");

        setTimeout(function() {
            toastElement.addClass("hidden");
            showToast(message, success);
        }, 300);

        return;
    }

    const successElement = $("#toast-container #toast-success");
    const errorElement = $("#toast-container #toast-error");

    if(success) {
        successElement.removeClass("hidden");
        errorElement.addClass("hidden");
    } else {
        successElement.addClass("hidden");
        errorElement.removeClass("hidden");
    }

    const messageElement = $("#toast-container #toast-message");
    messageElement.text(message);

    toastElement.removeClass("hidden");

    // opacity-100 is always treated as priority on opacity-0
    // so add it first for animation in
    toastElement.addClass("opacity-100");
    toastElement.removeClass("opacity-0");

    setTimeout(function() {
        // opacity-100 is always treated as priority on opacity-0
        // so remove it last for animation out
        toastElement.addClass("opacity-0");
        toastElement.removeClass("opacity-100");

        setTimeout(function() {
            toastElement.addClass("hidden");
        }, 500);

    }, 5000);
}