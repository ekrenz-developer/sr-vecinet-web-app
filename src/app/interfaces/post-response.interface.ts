export interface PostResponseInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | undefined;
  latitude: number;
  longitude: number;
  content: string;
  username: string;
}
