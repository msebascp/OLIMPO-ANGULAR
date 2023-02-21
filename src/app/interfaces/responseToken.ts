export interface ResponseToken {
    data: {
      token:string,
      isTrainer:boolean,
      isLogin:boolean
    };
    message: string;
    success: boolean;
}
