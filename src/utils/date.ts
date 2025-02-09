type TimeUnit = "milliseconds" | "seconds" | "minutes" | "hours" | "days";
export const timeDifference = (
  date1: Date,
  date2: Date,
  option: TimeUnit = "milliseconds"
): number => {
  const millisecondsDifference = date1.valueOf() - date2.valueOf();

  switch (option) {
    case "seconds":
      return millisecondsDifference / 1000;
    case "minutes":
      return millisecondsDifference / 1000 / 60;
    case "hours":
      return millisecondsDifference / 1000 / 60 / 60;
    case "days":
      return millisecondsDifference / 1000 / 60 / 60 / 24;
    default:
      return millisecondsDifference;
  }
};
