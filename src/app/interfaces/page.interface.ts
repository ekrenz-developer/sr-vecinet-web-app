import { PageMetadataInterface } from './page-metadata.interface';

export interface PageInterface<T> {
  content: T[];
  metadada: PageMetadataInterface;
}
