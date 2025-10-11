export type VideoBackgroundProps = {
  src: string;
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
