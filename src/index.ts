import SeriesHelper from "./utils/SeriesHelper";

function onPageChange() {
    if (SeriesHelper.seriesRegex.test(location.pathname)) {
        SeriesHelper.addDownloadButton();
    }

    // TODO: Support read lists
}

(function () {
    var pushState = history.pushState;
    history.pushState = function () {
        // @ts-ignore
        pushState.apply(history, arguments);
        onPageChange();
    };

    onPageChange();
})();
