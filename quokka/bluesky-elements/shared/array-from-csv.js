const arrayFromCsv = (csv) => csv.split(',').map((item) => item.trim());

export { arrayFromCsv };