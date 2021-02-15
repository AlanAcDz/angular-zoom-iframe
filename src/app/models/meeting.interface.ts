
export interface Meeting {
    id: string;
    name: string;
    passcode: string;
}

export interface ZoomResponse {
    errorCode: number;
    errorMessage: string;
    method: string;
    result: string;
    status: boolean;
}
