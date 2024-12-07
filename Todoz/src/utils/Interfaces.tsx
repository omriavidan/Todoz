export interface Issue {
    id: string,
    summary: string,
    description: string,
    assignee: string,
    storyPoints: number
    status: string
}

export type ColumnType = {
    id: string
    title: string;
}
