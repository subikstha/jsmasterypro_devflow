interface Tag {
  _id: string;
  name: string;
  questions?: number;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
}

//
type ActionResponse<T = null> = {
  success: boolean;
  data?: T; // Data is whatever we pass as parameter to the ActionResponse
  error?: {
    // If there is no data then we must have an error
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>; // This Record<string,string> is a utility type that defines an object structure where each property is a key value pair both of which are strings
  searchParams: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface GetRecommendedQuestionsParams extends PaginatedSearchParams {
  userId: string;
}

interface Answer {
  _id: string;
  author: Author;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  question: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt: Date;
}

interface Collection {
  _id: string;
  author: string | Author;
  question: Question;
}

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

interface DNSData {
  dns: {
    ip: string;
    geo: string;
  };
}

interface LocationData {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  retion: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

type CountriesData = {
  name: {
    common: string;
    nativeName: {
      ara: {
        official: string;
        common: string;
      };
    };
    official: string;
  };
  altSpellings: string[];
  area: number;
  borders: string[];
  capital: string[];
  capitalInfo: {
    latlng: number[];
  };
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
}[];
// NOTE: There was an import ReactNode at the top of this file which was messing up the global type imports
