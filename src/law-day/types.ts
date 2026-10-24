export interface DeliverableItem {
  id: string;
  title: string;
  category: 'campaign' | 'special' | 'artifacts' | string;
  categoryLabel: string;
  description: string;
  specs: string;
  badge?: string;
  highlightText?: string;
  bgGradient: string;
  features: string[];
}

export interface StrategicPillarItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  principle: string;
}

export interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  textColor: string;
  description: string;
}

export interface QuestionGroup {
  id: string;
  groupTitle: string;
  groupSubtitle: string;
  icon: string;
  questions: {
    id: string;
    question: string;
    importance: string;
    exampleAnswer: string;
    designAdvice: string;
    userValue: string;
  }[];
}

export interface CaseMetric {
  label: string;
  value: string;
  change?: string;
  description: string;
}

export interface ShiftComparisonItem {
  dimension: string;
  before: {
    title: string;
    description: string;
  };
  after: {
    title: string;
    description: string;
  };
}

export interface ConceptPillar {
  id: string;
  title: string;
  subtitle: string;
  meaning: string;
  detail: string;
  tag: string;
}

export interface MetaphorItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image?: string;
}


export interface SpatialFeature {
  id: string;
  title: string;
  role: string;
  description: string;
  details?: string[];
  specs?: string;
  image?: string;
}

export interface VKCarouselSlide {
  slideNum: number;
  title: string;
  subtitle: string;
  text: string;
  badge: string;
  bgGradient: string;
}

export interface VKCarouselPost {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string;
  likes: string;
  comments: string;
  reposts: string;
  slides: VKCarouselSlide[];
}

export interface VKHighlightItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge?: string;
}

export interface VKCommunityData {
  desktopCover: {
    title: string;
    subtitle: string;
    status: string;
    subscribersCount: string;
    avatarText: string;
    bgGradient: string;
    specs: string;
  };
  mobileCover: {
    title: string;
    subtitle: string;
    liveVideoLabel: string;
    specs: string;
    bgGradient: string;
  };
  menuItems: VKHighlightItem[];
}
