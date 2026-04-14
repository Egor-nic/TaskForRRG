export interface TPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface TPostPageProps extends TPost {
  className?: string;
  isHoverEffect?: boolean;
};
