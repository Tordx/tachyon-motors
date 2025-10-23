export type VideoBackgroundProps = {
  videosrc: string[];
  overlayColor?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export type AppLogoProps = {
  onClick: () => void;
  className?: string;
}

export type NavigationProps = {
  name: string;
  href: string;
}

export interface Forum {
  id: number;
  created_at: string;
}

export interface ForumContent {
  id: number;
  forum_id: number;
  title: string;
  content: string;
  is_current: boolean;
  edited_at: string;
  forum: Forum;
}

export interface ForumUser {
  username: string;
  image_name: string | null;
}

export interface ForumInteractionCounter {
  id: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  report_count: number;
}

export interface ForumContentResponse {
  id: number;
  forum_id: number;
  title: string;
  content: string;
  is_current: boolean;
  edited_at: string;
  user: ForumUser | null;
  interaction_counter: ForumInteractionCounter | null;
}


export interface Discussion {
  id: number;
  parent_id?: number | null;
  title: string;
  slug: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
  parent?: {
    id: number;
    title: string;
    slug: string;
  } | null;
  bg_color: string;
}


export type FilterProps = {
  vehicleType: 'all' | 'cars' | 'motorcycles';
  financeType: 'all' | 'cash' | 'finance';
  yearRange: [number, number];
  priceRange: [number, number];
  searchValue: string
}