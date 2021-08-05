export enum BookTableColumnName {
    Id = 'id',
    Title = 'title',
    Description = 'description',
    PageCount = 'pageCount',
    PublishDate = 'publishDate', 
}

export const bookTableDisplayedColumns: string[] = [
    BookTableColumnName.Id,
    BookTableColumnName.Title,
    BookTableColumnName.Description,
    BookTableColumnName.PageCount,
    BookTableColumnName.PublishDate,
]

export interface BookInputAddControlls {
    title: string;
    description: string;
    pageCount: number;
    publishDate: Date;
}