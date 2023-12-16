export interface JapError {
    error: string;
}

export type JapServiceType =
    | "Default"
    | "Package"
    | "Custom Comments"
    | "Mentions with Hashtags"
    | "Mentions Custom List"
    | "Mentions Hashtag"
    | "Mentions User Followers"
    | "Mentions Media Likers"
    | "Custom Comments Package"
    | "Comment Likes"
    | "Poll"
    | "Comment Replies"
    | "Invites from Groups"
    | "Subscriptions";

export interface JapService {
    service: string;
    name: string;
    type: JapServiceType;
    rate: string;
    min: string;
    max: string;
    dripfeed: boolean;
    refill: boolean;
    cancel: boolean;
    category: string;
}

export interface JapNewOrder {
    service: number | string;
    link?: string;
    quantity?: number | string;
    runs?: number | string;
    interval?: number | string;
    answer_number?: number | string;
    comments?: string;
    delay?: number | string;
    expiry?: string;
    groups?: string;
    hashtag?: string;
    hashtags?: string;
    max?: number | string;
    media?: string;
    min?: number | string;
    old_posts?: number | string;
    posts?: number | string;
    username?: string;
    usernames?: string;
}

export type JapOrderStatusType = "Pending" | "In Progress" | "Completed" | "Partial" | "Canceled" | "Processing";

export interface JapOrderStatus {
    charge: string;
    start_count: string;
    status: JapOrderStatusType;
    remains: string;
    currency: string;
}

export interface JapOrderStatuses {
    [key: string]: JapOrderStatus | JapError;
}

export interface JapCreateRefill {
    refill: string;
}

export type JapCreateRefills = { order: number; refill: number | JapError }[];

export type JapRefillStatusType = "Pending" | "In Progress" | "Completed" | "Rejected" | "Error";

export interface JapRefillStatus {
    refill: JapRefillStatusType;
}

export type JapRefillStatuses = { refill: number; status: JapRefillStatusType | JapError }[];

export interface JapBalance {
    balance: string;
    currency: string;
}
