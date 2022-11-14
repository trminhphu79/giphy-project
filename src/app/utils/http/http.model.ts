export type THTTPParams = {
    $skip?: number;
    $top?: number;
    $filter?: string;
    $count?: boolean;
    $expand?: boolean;
    $orderby?: string;
    $select?: string;
}

export type THTTPResponseItems<T> = {
    value: Array<T>;
}

export type THTTPResponseItem<T> = {
    value: T;
}
