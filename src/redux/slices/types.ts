export type Loading = boolean;

// ----------------------------------------------------------------------

export type ErrorRequest = string | null;

// ----------------------------------------------------------------------

export type Request = {
    loading: Loading;
    error: ErrorRequest;
}