import moment from 'moment';

moment.locale("en", {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: "just now",
        ss: "%ss",
        m: "1m",
        mm: "%dm",
        h: "an hour",
        hh: "%dh",
        d: "yesterday",
        dd: "%dd",
        M: "a month",
        MM: "%dM",
        y: "last year",
        yy: "%dY"
    }
});