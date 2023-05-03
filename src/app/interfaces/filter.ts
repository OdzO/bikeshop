export interface Filter {
    name: string,
    selected?: string[],
    selectedMax?: number,
    selectedMin?: number,
    rangeMin?: number,
    rangeMax?: number,
    values?: (string | number)[],
    type?: string
}
