export class ApiResponse {
    constructor(
        public success: boolean,
        public message: string,
        public timestamp: Date) {
    }
}