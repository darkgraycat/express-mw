export declare namespace Middlewares {
    function params<T>(initial?: Partial<T>): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    function body<T>(initial?: Partial<T>): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    function response<T>(status: number): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    function validate<T>(schema: T): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
