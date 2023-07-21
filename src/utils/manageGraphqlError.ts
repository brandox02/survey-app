import toast from "react-hot-toast";


type Config = {
   errorCallback?: Function
   defaultErrorMessage?: string;
}

export default function manageGraphqlError(
   fn: Function, 
   obj: any, 
   {
      errorCallback, 
      defaultErrorMessage = 'Ocurrió un error'
   }: Config = {}
   ){
      return async () => {
         try {
            await fn();
         } catch (error: any) {
            let message: string = obj[error?.message || ''] || defaultErrorMessage;
            toast.error(message);
            console.error(error);
            errorCallback && errorCallback(error);
         }
      }
   
}