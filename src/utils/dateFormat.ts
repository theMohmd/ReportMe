export const dateFormat = (input: string) => {
    const date = new Date(input);

    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format the date string
    const formattedDate = `${hours}:${minutes} ${year}/${month}/${day}`;
    return formattedDate;
};
