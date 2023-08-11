import ReadListHelper from "./utils/ReadListHelper";
import SeriesHelper from "./utils/SeriesHelper";

function onPageChange() {
    if (SeriesHelper.seriesRegex.test(location.pathname)) {
        SeriesHelper.addDownloadButton();
    }

    if (ReadListHelper.readListRegex.test(location.pathname)) {
        ReadListHelper.addDownloadButton();
    }
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
