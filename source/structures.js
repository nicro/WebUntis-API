class Time {
    constructor(_year, _months, _days) {
        this.year = _year;
        this.months = _months;
        this.days = _days;
    }

    unite() {
        return `${this.year}${this.months}${this.days}`;
    }
}

module.exports.Time = Time;