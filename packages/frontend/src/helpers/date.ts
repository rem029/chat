export const dateFormat = (dateToFormat: Date, timezone?: string): string => {
	const dateOptions: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		weekday: "short",
		year: "numeric",
	};

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
	};

	const timeZoneOptions: Intl.DateTimeFormatOptions = {
		timeZone: timezone,
		timeZoneName: "short",
	};

	const isSameDay =
		dateToFormat.toLocaleDateString("en-us", dateOptions) ===
		new Date().toLocaleDateString("en-us", dateOptions);

	return isSameDay
		? "Today at " +
				dateToFormat.toLocaleString("en-us", {
					...timeOptions,
					...(timezone && timeZoneOptions),
				})
		: dateToFormat.toLocaleString("en-us", {
				...dateOptions,
				...timeOptions,
				...(timezone && timeZoneOptions),
		  });
};
