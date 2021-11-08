import { MatPaginatorIntl } from '@angular/material/paginator';

const frenchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 sur ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} sur ${length}`;
};

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Eléments par page';
  customPaginatorIntl.nextPageLabel = 'Page suivante';
  customPaginatorIntl.previousPageLabel = 'Page Précédente';
  customPaginatorIntl.getRangeLabel = frenchRangeLabel;

  return customPaginatorIntl;
}